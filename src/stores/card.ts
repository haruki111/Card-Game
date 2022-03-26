// import { defineStore } from "pinia";s

export class Card {
  public suit: string;
  public rank: string;

  constructor(suit: string, rank: string) {
    this.suit = suit;
    this.rank = rank;
  }

  getRankNumber(): number {
    if (this.rank == "A") return 11;
    else if (this.rank == "J" || this.rank == "Q" || this.rank == "K")
      return 10;
    return Number(this.rank);
  }
}

// export const useCardStore = defineStore({
//   id: "card",
//   state: () => ({
//     suit: "" as string,
//     rank: "" as string,
//   }),
//   getters: {
//     getRankNumber: (state) => {
//       if (state.rank == "A") return 11;
//       else if (state.rank == "J" || state.rank == "Q" || state.rank == "K")
//         return 10;

//       return Number(state.rank);
//     },
//   },
// });
