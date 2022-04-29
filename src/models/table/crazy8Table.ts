import { Table } from "./table";
import type { GameDecision } from "../gameDecision";
import type { Player } from "@/models/player/player";
import { Crazy8Player } from "@/models/player/crazy8Player";
import type { Card } from "@/stores/card";

export class Crazy8Table extends Table {
  // gamePhase distribute, play
  private _dealerNum: number;
  private _cardPlaceArr: Card[];
  constructor(
    userName: string,
    gameType: string,
    round: number,
    gameSpeed: number
  ) {
    const userType = userName.toLowerCase() == "ai" ? "ai" : "user";
    const players: Player[] = [
      new Crazy8Player("player1", "ai", -1),
      new Crazy8Player("player2", "ai", -1),
      new Crazy8Player(userName, userType, -1),
      new Crazy8Player("player3", "ai", -1),
    ];
    super(gameType, "distribute", round, gameSpeed, players);
    this._dealerNum = Math.floor(Math.random() * this.players.length);
    this._cardPlaceArr = [];
  }

  get dealerNum(): number {
    return this._dealerNum;
  }

  set dealerNum(number: number) {
    this._dealerNum = number;
  }
  get cardPlaceArr(): Card[] {
    return this._cardPlaceArr;
  }

  //playerに7 or 5枚ずつカードを配る
  public assignPlayerHands() {
    return new Promise((resolve) => {
      let howManyDistribute = 0;
      if (this.players.length == 2) howManyDistribute = 7;
      else howManyDistribute = 5;
      for (let i = 0; i < howManyDistribute; i++) {
        for (let j = 0; j < this.players.length; j++) {
          setTimeout(
            () => {
              this.players[j].hand.push(this.deck.drawOne());
              if (i == howManyDistribute - 1 && j == this.players.length - 1)
                resolve("success");
            },
            300 * (i * howManyDistribute - 1 + j),
            i,
            j
          );
        }
      }
    });
  }

  public getTurnPlayer(): Player {
    const turnPlayer: number =
      (this.turnCounter + this.dealerNum) % this.players.length;
    return turnPlayer == this.players.length
      ? this.players[0]
      : this.players[turnPlayer];
  }

  public evaluateMove(player: Crazy8Player, gameDecision: GameDecision): void {
    console.log(this.turnCounter);
    if (gameDecision.getAction() == "draw") {
      const drawCard: Card = this.deck.drawOne();
      const cardPlace: Card = this.cardPlaceArr[this.cardPlaceArr.length - 1];
      player.hand.push(drawCard);
      if (
        drawCard.suit == cardPlace.suit ||
        drawCard.rank == cardPlace.rank ||
        drawCard.rank == "8"
      ) {
        console.log("出す");
        this.haveTurn(drawCard);
      } else {
        console.log("引く");
        this.haveTurn("draw");
      }
    } else if (gameDecision.getAction() == "play") {
      const card = gameDecision.getAmount();
      if (typeof card === "object") {
        console.log(card);
        const index: number = player.hand.indexOf(card);
        player.hand.splice(index, 1);
        this.cardPlaceArr.push(card);
        this.turnCounter++;
      }
    }
  }

  public haveTurn(userData: number | string | Card | null): void {
    const player = this.getTurnPlayer() as Crazy8Player;
    if (this.gamePhase === "distribute") {
      const haveTurnDistributeHelper = (time: number) =>
        new Promise((resolve) => {
          setTimeout(() => {
            this.cardPlaceArr.push(this.deck.drawOne());
            this.gamePhase = "play";
            for (const player of this.players) player.gameStatus = "play";

            resolve("success");
          }, time);
        });

      const haveTurnDistribute = async () => {
        await this.assignPlayerHands();
        await haveTurnDistributeHelper(500);
      };
      haveTurnDistribute();
    } else if (this.gamePhase === "play") {
      const gameDecision: GameDecision = player.promptPlayer(
        userData,
        this.cardPlaceArr[this.cardPlaceArr.length - 1]
      );
      this.evaluateMove(player, gameDecision);
    }
  }
  nextTurn(): void {
    console.log("nextTurn");
  }
}
// rank Aとか特殊数字の判定あっているか確認
// 手札がなくなったら、playerは上がる処理を追加
// hostの場合はhostから見て、左のplayerが後任
