import { getLines } from "../../utils/getLines";
import { solutionPrinter } from "../../utils/solutionPrinter";

// see https://adventofcode.com/2025/day/7

const part1 = () => {
  const lines = getLines("./days/07/puzzle-inputs/input.txt");
  const grid = lines.map((x) => x.split(""));

  const startX = lines[0].indexOf("S");
  const total = dfs(grid, startX, 1, []);

  return total;
};

// recursive depth first search
const dfs = (
  grid: string[][],
  x: number,
  y: number,
  hitSplitters: string[]
): number => {
  const maxY = grid.length - 1;
  const maxX = grid[0].length - 1;

  if (x > maxX || x < 0 || y > maxY || y < 0) {
    return 0;
  }

  const char = grid[y][x];
  switch (char) {
    case ".":
      return dfs(grid, x, y + 1, hitSplitters);
    case "^":
      // each splitter can only split a single beam; if
      // this splitter has already been hit stop this path
      if (!!hitSplitters.find((v) => v === `${x}-${y}`)) {
        return 0;
      }

      hitSplitters.push(`${x}-${y}`);
      return (
        1 +
        dfs(grid, x - 1, y, hitSplitters) +
        dfs(grid, x + 1, y, hitSplitters)
      );
  }

  return 0;
};

const part2 = () => {};

solutionPrinter(7, 1, part1());
solutionPrinter(7, 2, part2());
