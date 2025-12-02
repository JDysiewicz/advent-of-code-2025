import { getLines } from "../../utils/getLines";
import { solutionPrinter } from "../../utils/solutionPrinter";

// see https://adventofcode.com/2025/day/1

const part1 = () => {
  const lines = getLines("./days/01/puzzle-inputs/input.txt");
  return calculateAnswerPart1(lines);
};

const calculateAnswerPart1 = (input: string[]): number => {
  let total = 50; // dial starts at 50
  let answer = 0;
  for (const line of input) {
    const direction = line[0];
    const distance = parseInt(line.slice(1));

    switch (direction) {
      case "L":
        total -= distance;
        break;
      case "R":
        total += distance;
        break;
      default:
        console.log(`unexpected puzzle input ${direction}`);
        process.exit(1);
    }

    total = normaliseRange(total);
    if (total === 0) {
      answer += 1;
    }
  }

  return answer;
};

const part2 = () => {
  const lines = getLines("./days/01/puzzle-inputs/input.txt");
  return calculateAnswerPart2(lines);
};

const calculateAnswerPart2 = (input: string[]): number => {
  let total = 50; // dial starts at 50
  let answer = 0;
  for (const line of input) {
    const direction = line[0];
    const distance = parseInt(line.slice(1));

    switch (direction) {
      case "L":
        // will double count if starting at 0, as this would've been counted
        // in previous iteration; pre-emptively subtract this if we're going below
        // 0.
        if (total === 0 && distance > 0) {
          answer -= 1;
        }
        total -= distance;

        if (total <= 0) {
          answer += 1 + Math.floor(total / -100);
        }

        break;
      case "R":
        total += distance;
        if (total >= 100) {
          answer += Math.floor(total / 100);
        }

        break;
      default:
        console.log(`unexpected puzzle input ${direction}`);
        process.exit(1);
    }

    total = normaliseRange(total);
  }

  return answer;
};

// Normalises total back to 0-99 range
const normaliseRange = (total: number): number => {
  let newTotal = total;

  if (total > 99) {
    newTotal = total % 100;
  } else if (total < 0) {
    newTotal = (100 + (total % 100)) % 100;
  }

  return newTotal;
};

solutionPrinter(1, 1, part1());
solutionPrinter(1, 2, part2());

export { calculateAnswerPart1, calculateAnswerPart2, normaliseRange };
