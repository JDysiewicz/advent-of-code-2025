import { getLines } from "../../utils/getLines";
import { solutionPrinter } from "../../utils/solutionPrinter";

// see https://adventofcode.com/2025/day/3

const part1 = () => {
  const lines = getLines("./days/03/puzzle-inputs/input.txt");
  const size = 2;

  return lines.reduce((acc, curr) => {
    return acc + findLargestCombination(curr, size);
  }, 0);
};

const part2 = () => {
  const lines = getLines("./days/03/puzzle-inputs/input.txt");
  const size = 12;

  return lines.reduce((acc, curr) => {
    return acc + findLargestCombination(curr, size);
  }, 0);
};

const findLargestCombination = (line: string, size: number): number => {
  let solutionArr = new Array(size).fill(null);

  const splitArr = line.split("");

  for (let i = 0; i < splitArr.length; i++) {
    const num = parseInt(splitArr[i]);
    const remainingLineLength = splitArr.length - (i + 1);

    for (let j = 0; j < solutionArr.length; j++) {
      const remainingSolutionLength = solutionArr.length - (j + 1);
      if (
        remainingLineLength >= remainingSolutionLength &&
        (solutionArr[j] === null || num > solutionArr[j])
      ) {
        solutionArr[j] = num;
        const firstHalf = solutionArr.slice(0, j + 1);
        const secondHalf = new Array(remainingSolutionLength).fill(null);

        solutionArr = [...firstHalf, ...secondHalf];
        break;
      }
    }
  }

  return parseInt(solutionArr.join(""));
};

solutionPrinter(3, 1, part1());
solutionPrinter(3, 2, part2());

export { findLargestCombination };
