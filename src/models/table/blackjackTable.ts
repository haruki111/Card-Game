import { Table } from "./table";
import { BlackJackPlayer } from "@/models/player/blackJackPlayer";
import type { Player } from "@/models/player/player";

import type { GameDecision } from "../gameDecision";
import { Investments } from "../Investments";

import chipNum5 from "../../assets/coin/chip_5.png";
import chipNum20 from "../../assets/coin/chip_20.png";
import chipNum50 from "../../assets/coin/chip_50.png";
import chipNum100 from "../../assets/coin/chip_100.png";

interface Result {
  name: string;
  action: string;
  bet: number;
  won: number;
  chips: number;
}
export class BlackJackTable extends Table {
  private _house: BlackJackPlayer;
  private _nextGamePhase: string;
  private _betDenominations: {
    5: string;
    20: string;
    50: string;
    100: string;
  };
  private _resultsLog: {
    round: number;
    result: Result[];
  }[];

  constructor(
    userName: string,
    gameType: string,
    round: number,
    gameSpeed: number
  ) {
    const userType = userName.toLowerCase() == "ai" ? "ai" : "user";
    const players: Player[] = [
      new BlackJackPlayer("player1", "ai", 400),
      new BlackJackPlayer(userName, userType, 400),
      new BlackJackPlayer("player3", "ai", 400),
    ];
    super(gameType, "betting", round, gameSpeed, players);
    this._house = new BlackJackPlayer("house", "house", -1);
    this._nextGamePhase = "";
    this._resultsLog = [];
    this._betDenominations = {
      5: chipNum5,
      20: chipNum20,
      50: chipNum50,
      100: chipNum100,
    };
  }

  get house(): BlackJackPlayer {
    return this._house;
  }

  get nextGamePhase(): string {
    return this._nextGamePhase;
  }

  set nextGamePhase(str: string) {
    this._nextGamePhase = str;
  }

  get betDenominations() {
    return this._betDenominations;
  }

  get resultsLog() {
    return this._resultsLog;
  }

  set resultsLog(
    log: {
      round: number;
      result: Result[];
    }[]
  ) {
    this._resultsLog = log;
  }

  getTurnPlayer(): Player {
    if (this.turnCounter == -1) return this.house;
    const turnPlayer = this.turnCounter % this.players.length;
    return turnPlayer == 0
      ? this.players[this.players.length - 1]
      : this.players[turnPlayer - 1];
  }

  allPlayerActionsResolved(): boolean {
    const setStatus = ["bust", "stand", "surrender", "double", "blackjack"];
    for (let i = 0; i < this.players.length; i++) {
      if (!setStatus.includes(this.players[i].gameStatus)) return false;
    }
    return true;
  }

  blackjackGetRoundResults(): void {
    const hash: {
      round: number;
      result: Result[];
    } = {
      round: this.currRound,
      result: [],
    };

    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      hash.result[i] = {
        name: player.name,
        action: player.gameStatus,
        bet: player.bet,
        won: player.winAmount,
        chips: player.chips,
      };
    }
    this.resultsLog.push(hash);
  }

  assignPlayerHands(): Promise<unknown> {
    return new Promise((resolve) => {
      for (let ci = 0; ci < 2; ci++) {
        for (let pj = 0; pj < this.players.length + 1; pj++) {
          setTimeout(
            () => {
              if (pj == this.players.length) {
                this.house.hand[ci] = this.deck.drawOne();
              } else {
                this.players[pj].hand[ci] = this.deck.drawOne();
              }
              if (ci === 1 && pj === this.players.length) {
                resolve("success");
              }
            },
            300 * (ci * (this.players.length + 1) + pj),
            ci,
            pj
          );
        }
      }
    });
  }

  evaluateMove(
    player: Player | BlackJackPlayer,
    gameDecision: GameDecision
  ): void {
    if (
      gameDecision.getAction() == "bet" &&
      typeof gameDecision.getAmount() == "number"
    ) {
      player.bet = Number(gameDecision.getAmount());
      player.chips -= player.bet;
      player.gameStatus = "bet";
    } else if (this.gamePhase == "acting") {
      if (gameDecision.getAction() == "surrender") {
        player.gameStatus = "surrender";
        player.bet -= Math.ceil(player.bet / 2);
        player.chips += player.bet;
      } else if (gameDecision.getAction() == "stand") {
        player.gameStatus = "stand";
      } else if (gameDecision.getAction() == "hit") {
        player.gameStatus = "hit";
        player.hand.push(this.deck.drawOne());
      } else if (gameDecision.getAction() == "double") {
        player.gameStatus = "double";
        player.bet *= 2;
        player.chips -= player.bet / 2;
        player.hand.push(this.deck.drawOne());
      }

      if (player.getHandScore() > 21) {
        player.gameStatus = "bust";
      }
    }
  }

  validBlackJack(): void {
    for (const player of this.players) {
      if (player.getHandScore() == 21 && player.hand.length == 2)
        player.gameStatus = "blackjack";
    }
  }

  haveTurn(userData: number | string | null): Promise<unknown> {
    return new Promise((resolve) => {
      const player = this.getTurnPlayer() as BlackJackPlayer;

      if (this.gamePhase == "betting") {
        const gameDecision: GameDecision = player.promptPlayer(userData);
        this.evaluateMove(player, gameDecision);
        const haveTurnBettingHelper = async () => {
          await this.assignPlayerHands(); //2枚カードを割り当て
          this.gamePhase = "acting";
          this.house.gameStatus = "waitingForActions";
          this.validBlackJack();
          this.turnCounter++;
          resolve("success");
        };
        if (this.onLastPlayer()) {
          haveTurnBettingHelper();
        } else {
          this.turnCounter++;
          resolve("success");
        }
      } else if (this.gamePhase == "acting") {
        if (player.gameStatus == "bet" || player.gameStatus == "hit") {
          const gameDecision: GameDecision = player.promptPlayer(
            userData,
            this.house.hand[0].getRankNumber()
          );
          this.evaluateMove(player, gameDecision);
        }
        this.turnCounter++;

        if (this.allPlayerActionsResolved() && this.onLastPlayer()) {
          this.gamePhase = "evaluatingWinners";
          this.turnCounter = -1;
          resolve("success");
        } else resolve("success");
      } else if (this.gamePhase == "evaluatingWinners") {
        if (this.house.gameStatus == "waitingForActions") {
          if (this.house.getHandScore() == 21 && this.house.hand.length == 2)
            this.house.gameStatus = "blackjack";
          else if (this.house.getHandScore() < 17)
            this.house.gameStatus = "hit";
          else this.house.gameStatus = "bet";
          resolve("success");
        } else if (this.house.gameStatus == "hit") {
          this.house.hand.push(this.deck.drawOne());
          if (this.house.getHandScore() > 21) this.house.gameStatus = "bust";
          else if (this.house.getHandScore() >= 17)
            this.house.gameStatus = "bet";
          resolve("success");
        } else {
          for (const player of this.players) {
            this.blackjackEvaluate(player);
          }
          this.gamePhase = "evaluatingEnd";
          resolve("success");
        }
      } else if (this.gamePhase == "evaluatingEnd") {
        this.blackjackGetRoundResults();
        const haveTurnEvaluatingHelper = async () => {
          await new Promise((resolve) => {
            setTimeout(() => {
              this.nextRound();
              resolve("success");
            }, 3000);
          });
          resolve("success");
        };
        haveTurnEvaluatingHelper();
      }
    });
  }

  blackjackEvaluate(player: Player | BlackJackPlayer): void {
    //プレイヤーがバ-スト or サレンダー
    if (player.gameStatus == "bust" || player.gameStatus == "surrender") {
      player.winAmount -= player.bet;
    } // プレイヤー ハウス共にblackjack
    else if (
      player.gameStatus == "blackjack" &&
      this.house.gameStatus == "blackjack"
    ) {
      player.chips += player.bet;
      player.winAmount = 0;
    } // ハウス blackjack
    else if (this.house.gameStatus == "blackjack") {
      player.winAmount -= player.bet;
    } //プレイヤー blackjack
    else if (player.gameStatus == "blackJack") {
      player.chips += Math.ceil(player.bet * 2.5);
      player.winAmount += Math.ceil(player.bet * 1.5);
    } //ハウスがバ-スト、またはプレイヤーの手札がディーラの手札よりも大きい場合
    else if (
      player.getHandScore() > this.house.getHandScore() ||
      this.house.gameStatus == "bust"
    ) {
      player.chips += player.bet * 2;
      player.winAmount += player.bet;
    } //ハウスがバ-ストしておらず、ハウスの手札がプレイヤーの手札より大きい場合
    else if (
      this.house.gameStatus != "bust" &&
      player.getHandScore() < this.house.getHandScore()
    ) {
      player.winAmount -= player.bet;
    } else player.chips += player.bet; //引き分け

    player.updateGrades();
    if (player.chips == 0 && player.type == "user") this.nextGamePhase = "end";
  }

  blackjackClearPlayerHandsAndBets(): void {
    this.deck.resetDeck();

    for (const player of this.players) {
      player.bet = 0;
      player.winAmount = 0;
      player.hand.length = 0;
      player.gameStatus = "betting";
    }

    this.house.hand.length = 0;
    this.house.gameStatus = "betting";
  }
  nextRound(): void {
    if (this.currRound == this.round || this.nextGamePhase == "end") {
      this.gamePhase = "end";
    } else {
      this.turnCounter = 1;
      this.currRound++;
      this.gamePhase = "betting";
      this.blackjackClearPlayerHandsAndBets();
    }
  }

  formatTable() {
    this.gamePhase = "betting";
    this.nextGamePhase = "";
    this.currRound = 1;
    this.turnCounter = 1;
    this.resultsLog = [];
  }

  formatPlayer() {
    this.blackjackClearPlayerHandsAndBets();

    for (const player of this.players) {
      player.chips = 400;
      player.grades = []; //成績
      player.investment = new Investments(player.chips).getInvestment(); //投資法
    }
  }
}
