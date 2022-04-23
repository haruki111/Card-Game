import { useDeckStore } from "./deck";
import { defineStore } from "pinia";
import { Player } from "./player";
import { Card } from "./card";
import type { GameDecision } from "../models/gameDecision";
import { Investments } from "../models/Investments";

import chipNum5 from "../assets/coin/chip_5.png";
import chipNum20 from "../assets/coin/chip_20.png";
import chipNum50 from "../assets/coin/chip_50.png";
import chipNum100 from "../assets/coin/chip_100.png";

import { BlackJackTable } from "@/models/table/blackjackTable";
import type { Table } from "@/models/table/table";

// interface Result {
//   name: string;
//   action: string;
//   bet: number;
//   won: number;
//   chips: number;
// }

export const useTableStore = defineStore({
  id: "table",
  state: () => ({
    table: {} as Table | BlackJackTable,
  }),
  actions: {
    setTable(gameSettingHash: {
      name: string;
      game: string;
      round: number;
      speed: number;
    }): void {
      this.table = new BlackJackTable(
        gameSettingHash.name,
        gameSettingHash.game,
        gameSettingHash.round,
        gameSettingHash.speed
      );
    },
  },
});

// export const useTableStore = defineStore({
//   id: "table",
//   state: () => ({
//     table: Object,
//     gameType: "",
//     round: 0,
//     gameSpeed: 1,
//     betDenominations: {
//       5: chipNum5,
//       20: chipNum20,
//       50: chipNum50,
//       100: chipNum100,
//     },
//     deck: useDeckStore(),
//     gamePhase: "betting", //betting, acting, 'evaluatingWinners, gameOver'
//     nextGamePhase: "",
//     players: [
//       new Player("player1", "ai"),
//       new Player("", ""),
//       new Player("player3", "ai"),
//     ],
//     house: new Player("house", "house"),
//     resultsLog: [] as {
//       round: number;
//       result: Result[];
//     }[],
//     turnCounter: 1,
//     currRound: 1,
//   }),
//   getters: {
//     getTurnPlayer(state): Player {
//       if (state.turnCounter == -1) return state.house;
//       const turnPlayer = state.turnCounter % state.players.length;
//       return turnPlayer == 0
//         ? state.players[state.players.length - 1]
//         : state.players[turnPlayer - 1];
//     },

//     onLastPlayer(): boolean {
//       return this.getTurnPlayer == this.players[this.players.length - 1];
//     },

//     allPlayerActionsResolved() {
//       const setStatus = ["bust", "stand", "surrender", "double", "blackjack"];
//       for (let i = 0; i < this.players.length; i++) {
//         if (!setStatus.includes(this.players[i].gameStatus)) return false;
//       }
//       return true;
//     },
//   },
//   actions: {
//     constructor(
//       userName: string,
//       gameType: string,
//       gameRound: number,
//       gameSpeed: number
//     ): void {
//       this.players[1].name = userName;
//       const userType = userName == "ai" ? "ai" : "user";
//       this.players[1].type = userType;
//       for (let i = 0; i < this.players.length; i++) {
//         this.players[i].gameType = gameType;
//       }
//       this.house.gameType = gameType;

//       this.gameType = gameType;
//       this.round = gameRound;
//       this.gameSpeed = gameSpeed;
//       this.deck.generateDeck();
//       this.deck.shuffleDeck();
//     },

//     evaluateMove(player: Player, gameDecision: GameDecision): void {
//       if (
//         gameDecision.getAction() == "bet" &&
//         typeof gameDecision.getAmount() == "number"
//       ) {
//         player.bet = Number(gameDecision.getAmount());
//         player.chips -= player.bet;
//         player.gameStatus = "bet";
//       } else if (this.gamePhase == "acting") {
//         if (gameDecision.getAction() == "surrender") {
//           player.gameStatus = "surrender";
//           player.bet -= Math.ceil(player.bet / 2);
//           player.chips += player.bet;
//         } else if (gameDecision.getAction() == "stand") {
//           player.gameStatus = "stand";
//         } else if (gameDecision.getAction() == "hit") {
//           player.gameStatus = "hit";
//           player.hand.push(this.deck.drawOne());
//         } else if (gameDecision.getAction() == "double") {
//           player.gameStatus = "double";
//           player.bet *= 2;
//           player.chips -= player.bet / 2;
//           player.hand.push(this.deck.drawOne());
//         }

//         if (player.getHandScore() > 21) {
//           player.gameStatus = "bust";
//         }
//       }
//     },

//     blackjackGetRoundResults(): {
//       round: number;
//       result: Result[];
//     } {
//       const hash: {
//         round: number;
//         result: Result[];
//       } = {
//         round: this.currRound,
//         result: [],
//       };

//       for (let i = 0; i < this.players.length; i++) {
//         const player = this.players[i];
//         hash.result[i] = {
//           name: player.name,
//           action: player.gameStatus,
//           bet: player.bet,
//           won: player.winAmount,
//           chips: player.chips,
//         };
//       }
//       this.resultsLog.push(hash);
//       return hash;
//     },

//     //house, playerに2枚ずつカードを配る
//     blackjackAssignPlayerHands(): void {
//       for (let i = 0; i < this.players.length; i++) {
//         this.players[i].hand[0] = this.deck.drawOne();
//         this.players[i].hand[1] = this.deck.drawOne();
//       }

//       this.house.hand[0] = this.deck.drawOne();
//       this.house.hand[1] = this.deck.drawOne();
//     },

//     validBlackJack(): void {
//       for (let i = 0; i < this.players.length; i++) {
//         const player = this.players[i];
//         if (player.getHandScore() == 21 && player.hand.length == 2)
//           player.gameStatus = "blackjack";
//       }
//     },

//     haveTurn(userData: number | string | null): void {
//       const player: Player = this.getTurnPlayer;

//       if (this.gamePhase == "betting") {
//         const gameDecision: GameDecision = player.promptPlayer(userData);
//         this.evaluateMove(player, gameDecision);
//         if (this.onLastPlayer) {
//           this.blackjackAssignPlayerHands(); //2枚カードを割り当て
//           this.gamePhase = "acting";
//           this.house.gameStatus = "waitingForActions";
//           this.validBlackJack();
//         }
//         this.turnCounter++;
//       } else if (this.gamePhase == "acting") {
//         if (player.gameStatus == "bet" || player.gameStatus == "hit") {
//           const gameDecision: GameDecision = player.promptPlayer(
//             userData,
//             this.house.hand[0].getRankNumber()
//           );
//           this.evaluateMove(player, gameDecision);
//         }
//         this.turnCounter++;

//         if (this.allPlayerActionsResolved && this.onLastPlayer) {
//           this.gamePhase = "evaluatingWinners";
//           this.turnCounter = -1;
//         }
//       } else if (this.gamePhase == "evaluatingWinners") {
//         if (this.house.gameStatus == "waitingForActions") {
//           if (this.house.getHandScore() == 21 && this.house.hand.length == 2)
//             this.house.gameStatus = "blackjack";
//           else if (this.house.getHandScore() < 17)
//             this.house.gameStatus = "hit";
//           else this.house.gameStatus = "bet";
//         } else if (this.house.gameStatus == "hit") {
//           this.house.hand.push(this.deck.drawOne());
//           if (this.house.getHandScore() > 21) this.house.gameStatus = "bust";
//           else if (this.house.getHandScore() >= 17)
//             this.house.gameStatus = "bet";
//         } else {
//           for (let i = 0; i < this.players.length; i++) {
//             this.blackjackEvaluate(this.players[i]);
//           }
//           this.gamePhase = "evaluatingEnd";
//           this.blackjackGetRoundResults();
//         }
//       }
//     },

//     blackjackEvaluate(player: Player): void {
//       //プレイヤーがバ-スト or サレンダー
//       if (player.gameStatus == "bust" || player.gameStatus == "surrender") {
//         player.winAmount -= player.bet;
//       } // プレイヤー ハウス共にblackjack
//       else if (
//         player.gameStatus == "blackjack" &&
//         this.house.gameStatus == "blackjack"
//       ) {
//         player.chips += player.bet;
//         player.winAmount = 0;
//       } // ハウス blackjack
//       else if (this.house.gameStatus == "blackjack") {
//         player.winAmount -= player.bet;
//       } //プレイヤー blackjack
//       else if (player.gameStatus == "blackJack") {
//         player.chips += Math.ceil(player.bet * 2.5);
//         player.winAmount += Math.ceil(player.bet * 1.5);
//       } //ハウスがバ-スト、またはプレイヤーの手札がディーラの手札よりも大きい場合
//       else if (
//         player.getHandScore() > this.house.getHandScore() ||
//         this.house.gameStatus == "bust"
//       ) {
//         player.chips += player.bet * 2;
//         player.winAmount += player.bet;
//       } //ハウスがバ-ストしておらず、ハウスの手札がプレイヤーの手札より大きい場合
//       else if (
//         this.house.gameStatus != "bust" &&
//         player.getHandScore() < this.house.getHandScore()
//       ) {
//         player.winAmount -= player.bet;
//       } else player.chips += player.bet; //引き分け

//       player.updateGrades();
//       if (player.chips == 0 && player.type == "user")
//         this.nextGamePhase = "end";
//     },

//     blackjackClearPlayerHandsAndBets(): void {
//       this.deck.resetDeck();

//       for (let i = 0; i < this.players.length; i++) {
//         const player: Player = this.players[i];
//         player.bet = 0;
//         player.winAmount = 0;
//         player.hand.length = 0;
//         player.hand = [new Card("?", "?"), new Card("?", "?")];
//         player.gameStatus = "betting";
//       }

//       this.house.hand.length = 0;
//       this.house.hand = [new Card("?", "?"), new Card("?", "?")];
//       this.house.gameStatus = "betting";
//     },
//     nextTurn(): void {
//       if (this.currRound == this.round || this.nextGamePhase == "end") {
//         this.gamePhase = "end";
//       } else {
//         this.turnCounter = 1;
//         this.currRound++;
//         this.gamePhase = "betting";
//         this.blackjackClearPlayerHandsAndBets();
//       }
//     },

//     formatTable() {
//       this.gamePhase = "betting";
//       this.nextGamePhase = "";
//       this.currRound = 1;
//       this.turnCounter = 1;
//       this.resultsLog = [];
//     },

//     formatPlayer() {
//       this.blackjackClearPlayerHandsAndBets();
//       for (let i = 0; i < this.players.length; i++) {
//         this.players[i].chips = 400;
//         this.players[i].grades = []; //成績
//         this.players[i].investment = new Investments(
//           this.players[i].chips
//         ).getInvestment(); //投資法
//       }
//     },
//   },
// });
