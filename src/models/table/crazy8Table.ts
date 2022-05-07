import { Table } from "./table";
import type { GameDecision } from "../gameDecision";
import type { Player } from "@/models/player/player";
import { Crazy8Player } from "@/models/player/crazy8Player";
import type { Card } from "@/stores/card";

export class Crazy8Table extends Table {
  // gamePhase distribute, play
  private _winPlayers: Player[];
  private _dealerNum: number;
  private _cardPlaceArr: Card[];
  private _orderCorrection: number;
  constructor(
    userName: string,
    gameType: string,
    round: number,
    gameSpeed: number
  ) {
    const userType = userName.toLowerCase() == "ai" ? "ai" : "user";
    const players: Player[] = [
      new Crazy8Player("player1", "ai", 0),
      new Crazy8Player("player2", "ai", 0),
      new Crazy8Player(userName, userType, 0),
      new Crazy8Player("player3", "ai", 0),
    ];

    super(gameType, "distribute", round, gameSpeed, players);
    this._winPlayers = [];
    this._dealerNum = Math.floor(Math.random() * this.players.length);
    this._cardPlaceArr = [];
    this._orderCorrection = 0;
  }

  get winPlayers(): Player[] {
    return this._winPlayers;
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
  set cardPlaceArr(cards: Card[]) {
    this._cardPlaceArr = cards;
  }

  get orderCorrection(): number {
    return this._orderCorrection;
  }
  set orderCorrection(number: number) {
    this._orderCorrection = number;
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
      (this.turnCounter + this.dealerNum + this.orderCorrection) %
      this.players.length;

    return this.players[turnPlayer];
  }

  public isAllPlayerActionsResolved(): boolean {
    for (const player of this.players) {
      if (player.gameStatus !== "path") return false;
    }
    return true;
  }

  public evaluateMove(
    player: Crazy8Player,
    gameDecision: GameDecision
  ): Promise<unknown> {
    return new Promise((resolve) => {
      if (gameDecision.getAction() === "draw") {
        if (this.deck.deck.length == 0) {
          player.gameStatus = "path";
          this.turnCounter++;
          resolve("success");
          return;
        }
        const drawCard: Card = this.deck.drawOne();

        const helper = async () => {
          await new Promise((resolve) => {
            player.hand.push(drawCard);
            setTimeout(() => {
              resolve("success");
            }, 1000);
          });
          resolve("success");
        };
        helper();
      } else if (gameDecision.getAction() === "play") {
        const amount = gameDecision.getAmount();
        if (typeof amount === "object") {
          const card = amount.card;
          const index: number = player.hand.indexOf(card);
          player.hand.splice(index, 1);
          if (amount.nextSuit !== "") {
            card.suit = amount.nextSuit;
          }
          this.cardPlaceArr.push(card);
          this.isGameOut(player);
          this.turnCounter++;
          resolve("success");
        }
      } else if (gameDecision.getAction() === "path") {
        this.turnCounter++;
        resolve("success");
      }
    });
  }

  public haveTurn(
    userData: number | string | { card: Card; nextSuit: string } | null
  ): Promise<unknown> {
    return new Promise((resolve) => {
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
          resolve("success");
        };
        haveTurnDistribute();
      } else if (this.gamePhase === "play") {
        player.gameStatus = "play";
        const gameDecision: GameDecision = player.promptPlayer(
          userData,
          this.cardPlaceArr[this.cardPlaceArr.length - 1]
        );
        const haveTurnPlay = async () => {
          await this.evaluateMove(player, gameDecision);

          if (this.isAllPlayerActionsResolved()) {
            this.gamePhase = "evaluatingDeckRunsOut";
            resolve("success");
          } else resolve("success");
        };
        haveTurnPlay();
      } else if (this.gamePhase === "evaluatingDeckRunsOut") {
        this.Crazy8EvaluateDeckRunsOut();
        this.gamePhase = "betweenGames";
        const temp = async () => {
          await new Promise((resolve) => {
            setTimeout(() => {
              this.nextRound();
              resolve("success");
            }, 3000);
          });
          resolve("success");
        };
        temp();
      } else if (this.gamePhase === "evaluatingWinners") {
        this.crazy8Evaluate(player);
        this.gamePhase = "betweenGames";
        const temp = async () => {
          await new Promise((resolve) => {
            setTimeout(() => {
              this.nextRound();
              resolve("success");
            }, 3000);
          });
          resolve("success");
        };
        temp();
      }
    });
  }

  clearPlayerHands(): void {
    for (const player of this.players) {
      player.hand = [];
      player.gameStatus = "betting";
    }
  }

  nextRound(): void {
    if (this.currRound == this.round) {
      this.gamePhase = "end";
    } else {
      this.turnCounter = 1;
      this.currRound++;
      this.cardPlaceArr = [];
      this.dealerNum = Math.floor(Math.random() * this.players.length);
      this.gamePhase = "distribute";
      this.deck.resetDeck();
      this.clearPlayerHands();
    }
  }

  Crazy8EvaluateDeckRunsOut(): void {
    let playersTotalScore = this.players[0].getHandScore();
    let lowScorePlayers = [this.players[0]];
    for (let i = 1; i < this.players.length; i++) {
      playersTotalScore += this.players[i].getHandScore();

      if (this.players[i].getHandScore() < lowScorePlayers[0].getHandScore()) {
        lowScorePlayers = [this.players[i]];
      } else if (
        this.players[i].getHandScore() == lowScorePlayers[0].getHandScore()
      ) {
        lowScorePlayers.push(this.players[i]);
      }
    }
    for (const lowScorePlayer of lowScorePlayers) {
      this.winPlayers.push(lowScorePlayer);
      lowScorePlayer.chips =
        playersTotalScore - 4 * lowScorePlayer.getHandScore();
    }
  }

  crazy8Evaluate(winPlayer: Player): void {
    for (const player of this.players) {
      winPlayer.chips += player.getHandScore();
    }
  }

  formatTable(): void {
    this.gamePhase = "distribute";
    this.currRound = 1;
    this.turnCounter = 1;
    this.dealerNum = Math.floor(Math.random() * this.players.length);
    this.cardPlaceArr = [];
    this.deck.resetDeck();
  }

  formatPlayer(): void {
    this.clearPlayerHands();
    for (const player of this.players) {
      player.chips = 0;
    }
  }

  isGameOut(player: Crazy8Player): void {
    if (player.hand.length == 0) {
      this.winPlayers.push(player);
      this.gamePhase = "evaluatingWinners";
      this.turnCounter--;
    }
    // gameを続けるときに使用

    // if (player.hand.length == 0) {
    //   const isPlayerDealer = this.dealerNum == this.players.indexOf(player);
    //   if (isPlayerDealer && this.dealerNum + 1 > this.players.length) {
    //     this.dealerNum = 0;
    //   }

    //   const turnPlayer: number =
    //     (this.turnCounter + this.dealerNum + this.orderCorrection) %
    //     this.players.length;
    //   const nextPlayer: number =
    //     (this.turnCounter + 1 + this.dealerNum) % (this.players.length - 1);
    //   this.orderCorrection = turnPlayer - nextPlayer;

    //   this.players.splice(this.players.indexOf(player), 1);
    //   this.winPlayers.push(player);
    // }
  }
}
// Result、endResult画面の表示
