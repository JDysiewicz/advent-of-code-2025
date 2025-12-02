import { getLines } from "../../utils/getLines";
import { solutionPrinter } from "../../utils/solutionPrinter";

// see https://adventofcode.com/2025/day/2

const part1 = () => {
  const lines = getLines("./days/02/puzzle-inputs/input.txt");

  let total = 0;

  for (const line of lines[0].split(",")) {
    const start = parseInt(line.split("-")[0]);
    const end = parseInt(line.split("-")[1]);

    for (let i = start; i <= end; i++) {
      const isInvalid = isInvalidIdPart1(i);

      if (isInvalid) {
        total += i;
      }
    }
  }

  return total;
};

// is a pattern repeated exactly twice
const isInvalidIdPart1 = (num: number): boolean => {
  const str = num.toString();

  if (str.length % 2 !== 0) {
    return false;
  }

  if (str.slice(0, str.length / 2) === str.slice(str.length / 2)) {
    return true;
  }

  return false;
};

const part2 = () => {
  const lines = getLines("./days/02/puzzle-inputs/input.txt");

  let total = 0;

  for (const line of lines[0].split(",")) {
    const start = parseInt(line.split("-")[0]);
    const end = parseInt(line.split("-")[1]);

    for (let i = start; i <= end; i++) {
      const isInvalid = isInvalidIdPart2(i);

      if (isInvalid) {
        total += i;
      }
    }
  }

  return total;
};

// is any pattern, repeated at least twice
const isInvalidIdPart2 = (num: number): boolean => {
  const str = num.toString();

  // can have numbers with odd digits with repeating patterns (123123123)
  // but need at least 2 digits to repeat at least twice
  if (str.length === 1) {
    return false;
  }

  // recursively check each potential pattern which could be
  // repeated at least twice
  for (let i = 0; i < str.length / 2; i++) {
    const pattern = str.slice(0, i + 1);
    const chunked = chunkStringToSizeN(str, pattern.length);

    if (chunked.every((c) => c === pattern)) {
      return true;
    }
  }

  return false;
};

const chunkStringToSizeN = (str: string, size: number): string[] => {
  const result: string[] = [];
  for (let i = 0; i < str.length; i += size) {
    result.push(str.slice(i, i + size));
  }

  return result;
};

solutionPrinter(2, 1, part1());
solutionPrinter(2, 2, part2());

export { chunkStringToSizeN, isInvalidIdPart2 };
