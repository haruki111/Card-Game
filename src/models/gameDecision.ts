import type { Card } from "@/models/card";
export class GameDecision {
  private action: string | number | null;
  private amount: string | number | { card: Card; nextSuit: string };
  constructor(
    action: string | number | null,
    amount: string | number | { card: Card; nextSuit: string }
  ) {
    this.action = action;
    this.amount = amount;
  }
  public getAction(): string | number | null {
    return this.action;
  }
  public getAmount(): string | number | { card: Card; nextSuit: string } {
    return this.amount;
  }
}
