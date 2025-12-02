import { chunkStringToSizeN, isInvalidIdPart2 } from "./solution";

describe("chunkToSizeN", () => {
  it("works with trivial case 1", () => {
    const input = "1";
    const size = 1;
    expect(chunkStringToSizeN(input, size)).toEqual(["1"]);
  });

  it("works with trivial case 2", () => {
    const input = "12";
    const size = 1;
    expect(chunkStringToSizeN(input, size)).toEqual(["1", "2"]);
  });

  it("works with trivial case 3", () => {
    const input = "12";
    const size = 2;
    expect(chunkStringToSizeN(input, size)).toEqual(["12"]);
  });

  it("works with trivial case 4", () => {
    const input = "12";
    const size = 3;
    expect(chunkStringToSizeN(input, size)).toEqual(["12"]);
  });

  it("works with trivial case 5", () => {
    const input = "123123";
    const size = 3;
    expect(chunkStringToSizeN(input, size)).toEqual(["123", "123"]);
  });

  it("works with trivial case 6", () => {
    const input = "123123";
    const size = 4;
    expect(chunkStringToSizeN(input, size)).toEqual(["1231", "23"]);
  });
});

describe("isInvalidPart2", () => {
  it("works with sample inputs", () => {
    expect(isInvalidIdPart2(11)).toBe(true);
    expect(isInvalidIdPart2(22)).toBe(true);
    expect(isInvalidIdPart2(99)).toBe(true);
    expect(isInvalidIdPart2(111)).toBe(true);
    expect(isInvalidIdPart2(999)).toBe(true);
    expect(isInvalidIdPart2(1188511885)).toBe(true);
    expect(isInvalidIdPart2(824824824)).toBe(true);
    expect(isInvalidIdPart2(2121212121)).toBe(true);
  });

  it("fails as expected", () => {
    expect(isInvalidIdPart2(12)).toBe(false);
    expect(isInvalidIdPart2(12353445623)).toBe(false);
    expect(isInvalidIdPart2(8988988)).toBe(false);
  });

  it("single digits are not repeated patterns", () => {
    expect(isInvalidIdPart2(1)).toBe(false);
    expect(isInvalidIdPart2(4)).toBe(false);
    expect(isInvalidIdPart2(9)).toBe(false);
    expect(isInvalidIdPart2(0)).toBe(false);
  });
});
