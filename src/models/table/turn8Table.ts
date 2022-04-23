import { Table } from "./table";
import { Player } from "@/models/player/player";
import { Card } from "@/stores/card";

export class Turn8Table extends Table {
  // gamePhase distribute, play
  private dealerNum: number;
  private cardPlace: Card;
  constructor(gameType: string, gameSpeed: number) {
    const players: Player[] = [
      new Player("player1", "ai"),
      new Player("player2", "ai"),
      new Player("", ""),
      new Player("player3", "ai"),
    ];
    super(gameType, "distribute", gameSpeed, players);
    this.dealerNum = Math.floor(Math.random() * this.players.length);
    this.cardPlace = new Card("?", "?");
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
}
// playerクラスも抽象クラスにしないといけない
