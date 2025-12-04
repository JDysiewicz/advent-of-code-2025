import { getLines } from "../../utils/getLines";
import { solutionPrinter } from "../../utils/solutionPrinter";

// see https://adventofcode.com/2025/day/4

type Grid = string[][];
type Coords = [y: number, x: number];

const part1 = () => {
  const lines = getLines("./days/04/puzzle-inputs/input.txt");

  const grid = buildGrid(lines);

  let validRolls = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (isPaperRoll(grid[y][x])) {
        const adjacentRollsCount = countAdjacentRolls(x, y, grid);
        if (adjacentRollsCount < 4) {
          validRolls += 1;
        }
      }
    }
  }

  return validRolls;
};

const part2 = () => {
  const lines = getLines("./days/04/puzzle-inputs/input.txt");

  const grid = buildGrid(lines);
  let repeat = true;
  let validRolls = 0;

  // if we can remove a roll, then we need to check the grid again.
  // repeat until we do a complete pass through grid without removing
  // anything.
  while (repeat) {
    // assume we will not remove anything to prevent infinite loop
    repeat = false;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        if (isPaperRoll(grid[y][x])) {
          const adjacentRollsCount = countAdjacentRolls(x, y, grid);
          if (adjacentRollsCount < 4) {
            validRolls += 1;

            // remove this roll for future iterations
            grid[y][x] = ".";
            repeat = true;
          }
        }
      }
    }
  }

  return validRolls;
};

const buildGrid = (lines: string[]): Grid => {
  const grid: Grid = [];

  for (const line of lines) {
    grid.push(line.split(""));
  }

  return grid;
};

const countAdjacentRolls = (x: number, y: number, grid: Grid) => {
  const maxX = grid[0].length - 1;
  const maxY = grid.length - 1;
  const validCoords: Coords[] = [];

  // up
  if (y - 1 >= 0) {
    validCoords.push([y - 1, x]);
  }
  // up-right
  if (y - 1 >= 0 && x + 1 <= maxX) {
    validCoords.push([y - 1, x + 1]);
  }
  // right
  if (x + 1 <= maxX) {
    validCoords.push([y, x + 1]);
  }
  // down-right
  if (y + 1 <= maxY && x + 1 <= maxX) {
    validCoords.push([y + 1, x + 1]);
  }
  // down
  if (y + 1 <= maxY) {
    validCoords.push([y + 1, x]);
  }
  // down-left
  if (y + 1 <= maxY && x - 1 >= 0) {
    validCoords.push([y + 1, x - 1]);
  }
  // left
  if (x - 1 >= 0) {
    validCoords.push([y, x - 1]);
  }
  // up-left
  if (x - 1 >= 0 && y - 1 >= 0) {
    validCoords.push([y - 1, x - 1]);
  }

  return validCoords.reduce((acc, curr) => {
    if (isPaperRoll(grid[curr[0]][curr[1]])) {
      return acc + 1;
    }

    return acc;
  }, 0);
};

const isPaperRoll = (s: string) => {
  return s === "@";
};

solutionPrinter(4, 1, part1());
solutionPrinter(4, 2, part2());
