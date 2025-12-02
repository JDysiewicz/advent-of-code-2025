import { calculateAnswerPart2, normaliseRange } from "./solution";

describe("calculateAnswerPart2", () => {
  it("returns 0 when total under 100", () => {
    const input = `
    R1
    `
      .split("\n")
      .filter((x: string) => x.trim() != "")
      .map((x: string) => x.trim());

    expect(calculateAnswerPart2(input)).toBe(0);
  });

  it("returns 1 when total over 99", () => {
    const input = `
    R50
    `
      .split("\n")
      .filter((x: string) => x.trim() != "")
      .map((x: string) => x.trim());

    expect(calculateAnswerPart2(input)).toBe(1);
  });

  it("returns 1 when answer <=0", () => {
    const input = `
    L50
    `
      .split("\n")
      .filter((x: string) => x.trim() != "")
      .map((x: string) => x.trim());

    expect(calculateAnswerPart2(input)).toBe(1);
  });

  it("handles multiple directions", () => {
    let input = `
    R51
    R100
    `
      .split("\n")
      .filter((x: string) => x.trim() != "")
      .map((x: string) => x.trim());

    expect(calculateAnswerPart2(input)).toBe(2);

    input = `
    L51
    L100
    `
      .split("\n")
      .filter((x: string) => x.trim() != "")
      .map((x: string) => x.trim());

    expect(calculateAnswerPart2(input)).toBe(2);

    input = `
    L51
    R51
    `
      .split("\n")
      .filter((x: string) => x.trim() != "")
      .map((x: string) => x.trim());

    expect(calculateAnswerPart2(input)).toBe(2);
  });

  it("handles starting/ending on 0", () => {
    let input = `
    R50
    R250
    L50
    `
      .split("\n")
      .filter((x: string) => x.trim() != "")
      .map((x: string) => x.trim());

    expect(calculateAnswerPart2(input)).toBe(4);

    input = `
    R50
    L250
    R50
    `
      .split("\n")
      .filter((x: string) => x.trim() != "")
      .map((x: string) => x.trim());

    expect(calculateAnswerPart2(input)).toBe(4);
  });
});

describe("normaliseRange", () => {
  it("works with trivial positive numbers", () => {
    expect(normaliseRange(5)).toBe(5);
  });

  it("works with trivial negative numbers", () => {
    expect(normaliseRange(-5)).toBe(95);
  });

  it("works with large negative numbers", () => {
    expect(normaliseRange(-126)).toBe(74);
  });

  it("works with large positive numbers", () => {
    expect(normaliseRange(10722)).toBe(22);
  });

  it("works with exact bounds", () => {
    expect(normaliseRange(-100)).toBe(0);
    expect(normaliseRange(-1000)).toBe(0);
    expect(normaliseRange(100)).toBe(0);
    expect(normaliseRange(0)).toBe(0);
    expect(normaliseRange(-0)).toBe(0);
  });
});
