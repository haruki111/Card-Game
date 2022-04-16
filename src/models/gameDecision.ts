export class GameDecision {
  private action: string | number | null;
  private amount: string | number;
  constructor(action: string | number | null, amount: string | number) {
    this.action = action;
    this.amount = amount;
  }
  public getAction(): string | number | null {
    return this.action;
  }
  public getAmount(): string | number {
    return this.amount;
  }
}
