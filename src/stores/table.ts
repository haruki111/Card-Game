import { useDeckStore } from "./deck";
import { defineStore } from "pinia";
import { Player } from "./player";
import { Card } from "./card";

interface Result {
  name: string;
  action: string;
  bet: number;
  won: number;
  chips: number;
}

export const useTableStore = defineStore({
  id: "table",
  state: () => ({
    gameType: "",
    round: 0,
    gameSpeed: 1,
    betDenominations: {
      5: "src/assets/coin/chip_5.png",
      20: "src/assets/coin/chip_20.png",
      50: "src/assets/coin/chip_50.png",
      100: "src/assets/coin/chip_100.png",
    },
    deck: useDeckStore(),
    gamePhase: "betting", //betting, acting, 'evaluatingWinners, gameOver'
    nextGamePhase: "",
    players: [
      new Player("player1", "ai"),
      new Player("", ""),
      new Player("player3", "ai"),
    ],
    house: new Player("house", "house"),
    resultsLog: [] as {
      round: number;
      result: Result[];
    }[],
    turnCounter: 1,
    currRound: 1,
  }),
  getters: {
    getTurnPlayer(state): Player {
      if (state.turnCounter == -1) return state.house;
      const turnPlayer = state.turnCounter % state.players.length;
      return turnPlayer == 0
        ? state.players[state.players.length - 1]
        : state.players[turnPlayer - 1];
    },
    onLastPlayer(): boolean {
      return this.getTurnPlayer == this.players[this.players.length - 1];
    },
    // TODO
    // 毎回forを回すのはコストがかかるので、Mapを作り、setStatusになれば追加する
    // lengthがplayersの数分になればTRUE
    allPlayerActionsResolved() {
      const setStatus = ["bust", "stand", "surrender", "double", "blackjack"];
      for (let i = 0; i < this.players.length; i++) {
        if (!setStatus.includes(this.players[i].gameStatus)) return false;
      }
      return true;
    },
  },
  actions: {
    constructor(
      userName: string,
      gameType: string,
      gameRound: number,
      gameSpeed: number
    ) {
      this.players[1].name = userName;
      const userType = userName == "ai" ? "ai" : "user";
      this.players[1].type = userType;
      for (let i = 0; i < this.players.length; i++) {
        this.players[i].gameType = gameType;
      }
      this.house.gameType = gameType;

      this.gameType = gameType;
      this.round = gameRound;
      this.gameSpeed = gameSpeed;
      this.deck.generateDeck();
      this.deck.shuffleDeck();
    },
    evaluateMove(
      player: Player,
      gameDecision:
        | {
            action: string;
            amount: string | number;
          }
        | {
            action: string | number | null;
            amount: number;
          }
        | undefined
    ) {
      if (
        gameDecision?.action == "bet" &&
        typeof gameDecision.amount === "number"
      ) {
        player.bet = gameDecision.amount;
        player.chips -= player.bet;
        player.gameStatus = "bet";
        console.log("2222");
      }
      if (this.gamePhase == "acting") {
        if (gameDecision?.action == "surrender") {
          player.gameStatus = "surrender";
          player.bet -= Math.ceil(player.bet / 2);
          player.chips += player.bet;
        } else if (gameDecision?.action == "stand") {
          player.gameStatus = "stand";
        } else if (gameDecision?.action == "hit") {
          player.gameStatus = "hit";
          player.hand.push(this.deck.drawOne());
        } else if (gameDecision?.action == "double") {
          player.gameStatus = "double";
          player.bet *= 2;
          player.chips -= player.bet / 2;
          player.hand.push(this.deck.drawOne());
        }

        if (player.getHandScore() > 21) {
          player.gameStatus = "bust";
        }
      }
    },
    blackjackGetRoundResults(): {
      round: number;
      result: Result[];
    } {
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
      console.log(hash);
      this.resultsLog.push(hash);
      return hash;
    },

    //house, playerに2枚ずつカードを配る
    blackjackAssignPlayerHands() {
      for (let i = 0; i < this.players.length; i++) {
        this.players[i].hand[0] = this.deck.drawOne();
        this.players[i].hand[1] = this.deck.drawOne();
      }

      this.house.hand[0] = this.deck.drawOne();
      this.house.hand[1] = this.deck.drawOne();
    },

    validBlackJack() {
      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];
        if (player.getHandScore() == 21 && player.hand.length == 2)
          player.gameStatus = "blackjack";
      }
    },

    haveTurn(userData: number | string | null): void {
      const player: Player = this.getTurnPlayer;

      console.log(player);
      if (this.gamePhase == "betting") {
        const gameDecision = player.promptPlayer(userData);
        this.evaluateMove(player, gameDecision);
        if (this.onLastPlayer) {
          this.blackjackAssignPlayerHands(); //2枚カードを割り当て
          this.gamePhase = "acting";
          this.house.gameStatus = "waitingForActions";
          this.validBlackJack();
        }
        this.turnCounter++;
      } else if (this.gamePhase == "acting") {
        console.log("acting");
        if (player.gameStatus == "bet" || player.gameStatus == "hit") {
          const gameDecision = player.promptPlayer(
            userData,
            this.house.hand[0].getRankNumber()
          );
          this.evaluateMove(player, gameDecision);
        }
        this.turnCounter++;

        if (this.allPlayerActionsResolved && this.onLastPlayer) {
          this.gamePhase = "evaluatingWinners";
          this.turnCounter = -1;
        }
      } else if (this.gamePhase == "evaluatingWinners") {
        if (
          this.house.gameStatus == "waitingForActions" ||
          this.house.gameStatus == "hit"
        ) {
          if (this.house.getHandScore() < 17) {
            const houseHaveCard = this.house.hand.length;
            this.house.hand[houseHaveCard] = this.deck.drawOne();
            this.house.gameStatus = "hit";
          } else {
            if (this.house.getHandScore() == 21 && this.house.hand.length == 2)
              this.house.gameStatus = "blackjack";
            else if (this.house.getHandScore() > 21)
              this.house.gameStatus = "bust";
            else this.house.gameStatus = "stand";
          }
        } else {
          for (let i = 0; i < this.players.length; i++) {
            this.blackjackEvaluate(this.players[i]);
          }
          this.gamePhase = "evaluatingEnd";

          this.blackjackGetRoundResults();
        }
      }
    },

    // TODO後で見直し
    blackjackEvaluate(player: Player) {
      if (player.gameStatus == "bust" || player.gameStatus == "surrender")
        player.winAmount -= player.bet; //プレイヤーがバ-スト
      else if (this.house.gameStatus == "blackjack") {
        //ハウスがブラックジャックの場合
        if (player.gameStatus == "blackjack") {
          player.chips += player.bet;
          player.winAmount = 0;
        } else player.winAmount -= player.bet;
      } else if (
        player.getHandScore() > this.house.getHandScore() ||
        this.house.gameStatus == "bust" ||
        player.gameStatus == "blackjack"
      ) {
        //ハウスがバ-スト、またはプレイヤーの手札がディーラの手札よりも大きい場合
        if (player.gameStatus == "blackjack") {
          player.chips += Math.ceil(player.bet * 2.5);
          player.winAmount += Math.ceil(player.bet * 1.5);
        } else {
          player.chips += player.bet * 2;
          player.winAmount += player.bet;
        }
      } else if (
        this.house.gameStatus != "bust" &&
        player.getHandScore() < this.house.getHandScore()
      ) {
        //ハウスがバ-ストしておらず、ハウスの手札がプレイヤーの手札より大きい場合
        player.winAmount -= player.bet;
      } else player.chips += player.bet; //引き分け

      player.updateGrades();
      if (player.chips == 0 && player.type == "user")
        this.nextGamePhase = "end";
    },

    blackjackClearPlayerHandsAndBets() {
      this.deck.resetDeck();

      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];
        player.bet = 0;
        player.winAmount = 0;
        player.hand.length = 0;
        player.hand = [new Card("?", "?"), new Card("?", "?")];
        player.gameStatus = "betting";
      }

      this.house.hand.length = 0;
      this.house.hand = [new Card("?", "?"), new Card("?", "?")];
      this.house.gameStatus = "betting";
    },
    nextTurn() {
      if (this.currRound == this.round || this.nextGamePhase == "end") {
        this.gamePhase = "end";
      } else {
        this.turnCounter = 1;
        this.currRound++;
        this.gamePhase = "betting";
        this.blackjackClearPlayerHandsAndBets();
      }
    },

    formatTable() {
      this.gamePhase = "betting";
      this.nextGamePhase = "";
      this.currRound = 1;
      this.turnCounter = 1;
      this.resultsLog = [];
    },

    formatPlayer() {
      this.blackjackClearPlayerHandsAndBets();
      for (let i = 0; i < this.players.length; i++) {
        this.players[i].chips = 400;
        this.players[i].grades = []; //成績
        // this.players[i].investment = new Investments(this.players[i].chips); //投資法
      }
    },
  },
});
