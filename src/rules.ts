import type { Cell, Grid } from "./types";

export function countNeighbors(grid: Grid, r: number, c: number): number {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
        count += grid[nr][nc];
      }
    }
  }
  return count;
}

// ── NEXT GENERATION ────────────────────────────────────
// Applies the 4 rules and returns a brand new grid
export function nextGeneration(grid: Grid): Grid {
  return grid.map((row: Cell[], r: number) =>
    row.map((cell: Cell, c: number) => {
      const neighbors = countNeighbors(grid, r, c);

      if (cell === 1 && neighbors < 2) return 0 as Cell;   // rule 1: underpopulation
      if (cell === 1 && neighbors <= 3) return 1 as Cell;  // rule 2: survival
      if (cell === 1 && neighbors > 3) return 0 as Cell;   // rule 3: overpopulation
      if (cell === 0 && neighbors === 3) return 1 as Cell; // rule 4: reproduction
      return 0 as Cell;                                      // stays dead
    })
  );
}