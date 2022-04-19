import { GameDecision } from "../gameDecision";
import { describe, it, expect } from "vitest";

describe("GameDecision", () => {
  it("renders properly", () => {
    const wrapper = new GameDecision(1, 1);
    const wrapper2 = new GameDecision("a", "a");
    expect(wrapper.getAction()).toBe(1);
    expect(wrapper.getAmount()).toBe(1);

    expect(wrapper2.getAction()).toBe("a");
    expect(wrapper2.getAmount()).toBe("a");
  });
});
