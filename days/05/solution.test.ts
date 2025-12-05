import { binomialSearch } from "./solution";

describe("binomialSearch", () => {
  it("trivial case works", () => {
    expect(binomialSearch(5, 1, 10)).toBe(true);
  });

  it("works if target is min", () => {
    expect(binomialSearch(1, 1, 10)).toBe(true);
  });

  it("works if target is max", () => {
    expect(binomialSearch(10, 1, 10)).toBe(true);
  });

  it("if outside range works", () => {
    expect(binomialSearch(11, 1, 10)).toBe(false);
  });
});
