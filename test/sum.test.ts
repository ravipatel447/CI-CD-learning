import { describe, expect, test } from "@jest/globals";
import { sum } from "./sum";

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe("sum module", () => {
  test("adds 4 + 6 to equal 10 string", () => {
    expect(sum("4", "6")).toBe(10);
  });
});
