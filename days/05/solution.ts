import { getLines } from "../../utils/getLines";
import { solutionPrinter } from "../../utils/solutionPrinter";

// see https://adventofcode.com/2025/day/5

const part1 = () => {
  const lines = getLines("./days/05/puzzle-inputs/input.txt");

  const { ranges, ids } = getRangesAndIDs(lines);

  let count = 0;

  for (const id of ids) {
    if (isFresh(ranges, id)) {
      count++;
    }
  }

  return count;
};

const part2 = () => {
  const lines = getLines("./days/05/puzzle-inputs/input.txt");

  const { ranges } = getRangesAndIDs(lines);

  let contiguousRanges: string[] = [];
  for (const range of ranges) {
    // build up list of non-overlapping ranges from initial ranges
    contiguousRanges = buildContiguousRangeList(range, contiguousRanges);

    // check if this causes any new ranges to overlap, and combine/extend
    // list of ranges to reflect this to ensure none overlap
    let changed = true;
    while (changed) {
      changed = false;
      for (let i = 0; i < contiguousRanges.length; i++) {
        const oldLength = contiguousRanges.length;
        contiguousRanges = combineExistingRanges(i, contiguousRanges);

        // repeat this process until we've combined all we can
        if (oldLength != contiguousRanges.length) {
          changed = true;
        }
      }
    }
  }

  let count = 0;
  for (const range of contiguousRanges) {
    const min = parseInt(range.split("-")[0]);
    const max = parseInt(range.split("-")[1]);

    count += max - min + 1;
  }

  return count;
};

// if the current range extends or is contained within another existing one,
// we can just modify the range it extends and remove the current range
const combineExistingRanges = (
  currRangeIdx: number,
  existingRanges: string[]
) => {
  const currRange = existingRanges[currRangeIdx];
  const currMin = parseInt(currRange.split("-")[0]);
  const currMax = parseInt(currRange.split("-")[1]);

  for (let i = 0; i < existingRanges.length; i++) {
    // skip if same range already looking at
    if (i === currRangeIdx) {
      continue;
    }
    const rangeMin = parseInt(existingRanges[i].split("-")[0]);
    const rangeMax = parseInt(existingRanges[i].split("-")[1]);

    // wholly contained in another range; remove from list of ranges
    if (currMin >= rangeMin && currMax <= rangeMax) {
      return existingRanges
        .slice(0, currRangeIdx)
        .concat(existingRanges.slice(currRangeIdx + 1));
    }

    // currMax extends a range
    if (currMin >= rangeMin && currMin <= rangeMax && currMax > rangeMax) {
      existingRanges[i] = `${rangeMin}-${currMax}`;
      return existingRanges
        .slice(0, currRangeIdx)
        .concat(existingRanges.slice(currRangeIdx + 1));
    }

    // currMin extends a range
    if (currMin < rangeMin && currMax <= rangeMax && currMax >= rangeMin) {
      existingRanges[i] = `${currMin}-${rangeMax}`;
      return existingRanges
        .slice(0, currRangeIdx)
        .concat(existingRanges.slice(currRangeIdx + 1));
    }
  }

  return existingRanges;
};

const buildContiguousRangeList = (
  currRange: string,
  existingRanges: string[]
): string[] => {
  const currMin = parseInt(currRange.split("-")[0]);
  const currMax = parseInt(currRange.split("-")[1]);

  for (let i = 0; i < existingRanges.length; i++) {
    const rangeMin = parseInt(existingRanges[i].split("-")[0]);
    const rangeMax = parseInt(existingRanges[i].split("-")[1]);

    // range entirely contained in existing range is no-op
    if (currMin >= rangeMin && currMax <= rangeMax) {
      return existingRanges;
    }

    // currMax extends a range
    if (currMin >= rangeMin && currMin <= rangeMax && currMax > rangeMax) {
      existingRanges[i] = `${rangeMin}-${currMax}`;
      return existingRanges;
    }

    // currMin extends a range
    if (currMin < rangeMin && currMax <= rangeMax && currMax >= rangeMin) {
      existingRanges[i] = `${currMin}-${rangeMax}`;
      return existingRanges;
    }
  }

  // to make here, we have iterated over every existing range and not found one it can
  // join on to, so must be a new range
  existingRanges.push(`${currMin}-${currMax}`);

  return existingRanges;
};

const isFresh = (ranges: string[], id: number): boolean => {
  for (const range of ranges) {
    const [min, max] = range.split("-");
    if (binomialSearch(id, parseInt(min), parseInt(max))) {
      return true;
    }
  }

  return false;
};

const binomialSearch = (target: number, min: number, max: number): boolean => {
  if (target < min || target > max) {
    return false;
  }
  if (target === min || target === max) {
    return true;
  }

  if (min === max || min > max || max < min) {
    return false;
  }

  const mid = Math.floor((min + max) / 2);
  if (target === mid) {
    return true;
  } else if (target < mid) {
    return binomialSearch(target, min, mid + 1);
  } else if (target > mid) {
    return binomialSearch(target, mid + 1, max);
  }

  return false;
};

const getRangesAndIDs = (lines: string[]) => {
  const ranges: string[] = [];
  const ids: number[] = [];

  for (const line of lines) {
    if (line.trim() === "") {
      continue;
    }
    if (line.includes("-")) {
      ranges.push(line.trim());
    } else {
      ids.push(parseInt(line.trim()));
    }
  }

  return { ranges, ids };
};

solutionPrinter(5, 1, part1());
solutionPrinter(5, 2, part2());

export { binomialSearch };
