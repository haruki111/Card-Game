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

  set cardPlace(card: Card) {
    this._cardPlace = card;
  }
  //playerに7 or 5枚ずつカードを配る
  public assignPlayerHands(): void {
    let howManyDistribute = 0;
    if (this.players.length == 2) howManyDistribute = 7;
    else howManyDistribute = 5;
    for (let i = 0; i < howManyDistribute; i++) {
      for (let j = 0; j < this.players.length; j++) {
        setTimeout(() => {
          this.players[j].hand[i] = this.deck.drawOne();
        }, 200);
      }
    }
  }

  public haveTurn(userData: number | string | null): void {
    const player: Player = this.getTurnPlayer();
    if (this.gamePhase === "distribute") {
      this.assignPlayerHands();
      this.cardPlace = this.deck.drawOne();
    } else if (this.gamePhase === "play") {
      console.log("");
    }
  }
  nextTurn(): void {
    console.log("nextTurn");
  }
}
