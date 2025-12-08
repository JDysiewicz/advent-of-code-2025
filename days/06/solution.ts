import { getLines } from "../../utils/getLines";
import { solutionPrinter } from "../../utils/solutionPrinter";

// see https://adventofcode.com/2025/day/6

const part1 = () => {
  const lines = getLines("./days/06/puzzle-inputs/input.txt");

  const problems = [];
  let operators = [];
  let total = 0;
  for (const line of lines) {
    const row = line.split(" ").filter((x) => x.trim() !== "");
    if (row[0] === "+" || row[0] === "*") {
      operators = row;
    } else {
      problems.push(row);
    }
  }

  for (let o = 0; o < operators.length; o++) {
    const op = operators[o];
    let res = 0;
    let tmp = [];
    for (let i = 0; i < problems.length; i++) {
      const num = parseInt(problems[i][o]);
      tmp.push(num);
      if (i === 0) {
        res = num;
      } else if (op === "+") {
        res += num;
      } else {
        res *= num;
      }
    }
    total += res;
  }

  return total;
};

const part2 = () => {
  const lines = getLines("./days/06/puzzle-inputs/test-input.txt");

  const problems = [];
  let operators = [];
  let total = 0;
  for (const line of lines) {
    const row = line.split(" ").filter((x) => x.trim() !== "");
    if (row[0] === "+" || row[0] === "*") {
      operators = row;
    } else {
      problems.push(row);
    }
  }

  for (let o = 0; o < operators.length; o++) {
    const op = operators[o];
    let res = 0;

    const correctedNumbers = [];

    for (let i = 0; i < problems.length; i++) {
      const numStr = problems[i][o];

      console.log(numStr);
    }
    total += res;
  }

  return total;
};

solutionPrinter(6, 1, part1());
solutionPrinter(6, 2, part2());
