import type { Card } from "@/stores/card";
export class GameDecision {
  private action: string | number | null;
  private amount: string | number | Card;
  constructor(action: string | number | null, amount: string | number | Card) {
    this.action = action;
    this.amount = amount;
  }
  public getAction(): string | number | null {
    return this.action;
  }
  public getAmount(): string | number | Card {
    return this.amount;
  }
}
