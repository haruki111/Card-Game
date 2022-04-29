import { Table } from "./table";
import type { Player } from "@/models/player/player";
import { Crazy8Player } from "@/models/player/crazy8Player";
import { Card } from "@/stores/card";

export class Crazy8Table extends Table {
  // gamePhase distribute, play
  private _dealerNum: number;
  private _cardPlace: Card;
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
    this._cardPlace = new Card("?", "?");
  }

  get dealerNum(): number {
    return this._dealerNum;
  }

  get cardPlace(): Card {
    return this._cardPlace;
  }

  set cardPlace(card: Card) {
    this._cardPlace = card;
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
              this.players[j].hand[i] = this.deck.drawOne();
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

  public haveTurn(userData: number | string | null): void {
    const player: Player = this.getTurnPlayer();
    if (this.gamePhase === "distribute") {
      const haveTurnDistributeHelper = (time: number) =>
        new Promise((resolve) => {
          setTimeout(() => {
            this.cardPlace = this.deck.drawOne();
            this.gamePhase = "play";
            resolve("success");
          }, time);
        });

      const haveTurnDistribute = async () => {
        await this.assignPlayerHands();
        await haveTurnDistributeHelper(500);
      };
      haveTurnDistribute();
    } else if (this.gamePhase === "play") {
      console.log("");
    }
  }
  nextTurn(): void {
    console.log("nextTurn");
  }
}
