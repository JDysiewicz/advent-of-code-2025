import { calculateAnswerPart2, normaliseRange } from "./solution";

test("50 + 1 does not add", () => {
  const input = `
    R1
    `
    .split("\n")
    .filter((x: string) => x.trim() != "")
    .map((x: string) => x.trim());

  expect(calculateAnswerPart2(input)).toBe(0);
});

test("50 + 50 adds 1", () => {
  const input = `
    R50
    `
    .split("\n")
    .filter((x: string) => x.trim() != "")
    .map((x: string) => x.trim());

  expect(calculateAnswerPart2(input)).toBe(1);
});

test("50 - 51 adds 1", () => {
  const input = `
    L50
    `
    .split("\n")
    .filter((x: string) => x.trim() != "")
    .map((x: string) => x.trim());

  expect(calculateAnswerPart2(input)).toBe(1);
});

test("50 + 51 + 100 adds 2", () => {
  const input = `
    R51
    R100
    `
    .split("\n")
    .filter((x: string) => x.trim() != "")
    .map((x: string) => x.trim());

  expect(calculateAnswerPart2(input)).toBe(2);
});

test("50 - 51 - 100 adds 2", () => {
  const input = `
    L51
    L100
    `
    .split("\n")
    .filter((x: string) => x.trim() != "")
    .map((x: string) => x.trim());

  expect(calculateAnswerPart2(input)).toBe(2);
});

test("50 - 51 + 51 adds 2", () => {
  const input = `
    L51
    R51
    `
    .split("\n")
    .filter((x: string) => x.trim() != "")
    .map((x: string) => x.trim());

  expect(calculateAnswerPart2(input)).toBe(2);
});

test("50 + 50 + 250 - 50 = 4", () => {
  const input = `
    R50
    R250
    L50
    `
    .split("\n")
    .filter((x: string) => x.trim() != "")
    .map((x: string) => x.trim());

  expect(calculateAnswerPart2(input)).toBe(4);
});

test("50 + 50 - 250 + 50 = 4", () => {
  const input = `
    R50
    L250
    R50
    `
    .split("\n")
    .filter((x: string) => x.trim() != "")
    .map((x: string) => x.trim());

  expect(calculateAnswerPart2(input)).toBe(4);
});

test("normalise range works", () => {
  expect(normaliseRange(5)).toBe(5);
  expect(normaliseRange(-5)).toBe(95);
  expect(normaliseRange(-126)).toBe(74);
  expect(normaliseRange(-100)).toBe(0);
  expect(normaliseRange(-1000)).toBe(0);
  expect(normaliseRange(100)).toBe(0);
  expect(normaliseRange(10722)).toBe(22);
});
