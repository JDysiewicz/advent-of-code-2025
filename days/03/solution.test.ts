import {
  findLargestCombination
} from "./solution";

describe("findLargestCombination - part 1", () => {
  it("987654321111111", () => {
    expect(findLargestCombination("987654321111111", 2)).toBe(98);
  });

  it("811111111111119", () => {
    expect(findLargestCombination("811111111111119", 2)).toBe(89);
  });

  it("234234234234278", () => {
    expect(findLargestCombination("234234234234278", 2)).toBe(78);
  });

  it("818181911112111", () => {
    expect(findLargestCombination("818181911112111", 2)).toBe(92);
  });
});

describe("findLargestCombination - part 2", () => {
  it("987654321111111", () => {
    expect(findLargestCombination("987654321111111", 12)).toBe(
      987654321111
    );
  });

  it("811111111111119", () => {
    expect(findLargestCombination("811111111111119", 12)).toBe(
      811111111119
    );
  });

  it("234234234234278", () => {
    expect(findLargestCombination("234234234234278", 12)).toBe(
      434234234278
    );
  });

  it("818181911112111", () => {
    expect(findLargestCombination("818181911112111", 12)).toBe(
      888911112111
    );
  });
});
