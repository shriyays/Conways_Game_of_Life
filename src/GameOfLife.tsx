import { useState, useEffect, useCallback } from "react";
import type { Cell, Grid } from "./types";
import { nextGeneration } from "./rules";

// ── CONSTANTS ──────────────────────────────────────────
const ROWS: number = 100;
const COLS: number = 100;
const CELL_SIZE: number = 10;

// ── PATTERNS ───────────────────────────────────────────
const PATTERNS: Record<string, [number, number][]> = {
  Glider: [[0,1],[1,2],[2,0],[2,1],[2,2]],
  Blinker: [[1,0],[1,1],[1,2]],
  Block: [[0,0],[0,1],[1,0],[1,1]],
  Beacon: [[0,0],[0,1],[1,0],[2,3],[3,2],[3,3]],
  Pulsar: [
    [2,4],[2,5],[2,6],[2,10],[2,11],[2,12],
    [4,2],[4,7],[4,9],[4,14],
    [5,2],[5,7],[5,9],[5,14],
    [6,2],[6,7],[6,9],[6,14],
    [7,4],[7,5],[7,6],[7,10],[7,11],[7,12],
    [9,4],[9,5],[9,6],[9,10],[9,11],[9,12],
    [10,2],[10,7],[10,9],[10,14],
    [11,2],[11,7],[11,9],[11,14],
    [12,2],[12,7],[12,9],[12,14],
    [14,4],[14,5],[14,6],[14,10],[14,11],[14,12],
  ],
};

// ── HELPERS ────────────────────────────────────────────
function createEmptyGrid(): Grid {
  return Array.from({ length: ROWS }, () =>
    Array(COLS).fill(0) as Cell[]
  );
}

function toggleCell(grid: Grid, r: number, c: number): Grid {
  return grid.map((row: Cell[], ri: number) => {
    if (ri !== r) return row;
    return row.map((cell: Cell, ci: number) =>
      ci === c ? (cell === 1 ? 0 : 1) as Cell : cell
    );
  });
}

function randomGrid(): Grid {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () =>
      (Math.random() > 0.75 ? 1 : 0) as Cell
    )
  );
}

function loadPattern(name: string): Grid {
  const g = createEmptyGrid();
  const offsetR = Math.floor(ROWS / 2) - 7;
  const offsetC = Math.floor(COLS / 2) - 7;
  PATTERNS[name].forEach(([r, c]) => {
    if (r + offsetR < ROWS && c + offsetC < COLS)
      g[r + offsetR][c + offsetC] = 1;
  });
  return g;
}

// ── COMPONENT ──────────────────────────────────────────
export default function App() {
  const [grid, setGrid] = useState<Grid>(() => createEmptyGrid());
  const [running, setRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(100);
  const [gen, setGen] = useState<number>(0);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setGrid(g => nextGeneration(g));
      setGen(g => g + 1);
    }, speed);
    return () => clearInterval(interval);
  }, [running, speed]);

  const handleCellClick = useCallback((r: number, c: number) => {
    setGrid(g => toggleCell(g, r, c));
  }, []);

  const handleStep = () => {
    setGrid(g => nextGeneration(g));
    setGen(g => g + 1);
  };

  const handleClear = () => {
    setRunning(false);
    setGen(0);
    setGrid(createEmptyGrid());
  };

  const handleRandom = () => {
    setRunning(false);
    setGen(0);
    setGrid(randomGrid());
  };

  const handlePattern = (name: string) => {
    setRunning(false);
    setGen(0);
    setGrid(loadPattern(name));
  };

  return (
    <div style={{
      background: "#0f172a",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "monospace",
      color: "#e2e8f0",
      padding: "20px"
    }}>
      <h2 style={{ marginBottom: 4, color: "#a78bfa", fontSize: 22 }}>🧬 Conway's Game of Life</h2>
      <p style={{ marginBottom: 16, color: "#64748b", fontSize: 13 }}>Simple rules → Complex emergent behavior</p>

      {/* CONTROLS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={() => setRunning(r => !r)} style={{ padding: "6px 16px", borderRadius: 8, border: "none", cursor: "pointer", background: running ? "#ef4444" : "#22c55e", color: "white", fontWeight: 700 }}>
          {running ? "⏸ Pause" : "▶ Play"}
        </button>
        <button onClick={handleStep} disabled={running} style={{ padding: "6px 16px", borderRadius: 8, border: "none", cursor: "pointer", background: "#334155", color: "white" }}>
          ⏭ Step
        </button>
        <button onClick={handleRandom} style={{ padding: "6px 16px", borderRadius: 8, border: "none", cursor: "pointer", background: "#334155", color: "white" }}>
          🎲 Random
        </button>
        <button onClick={handleClear} style={{ padding: "6px 16px", borderRadius: 8, border: "none", cursor: "pointer", background: "#334155", color: "white" }}>
          🗑 Clear
        </button>
        <span style={{ color: "#64748b", fontSize: 12 }}>Gen: <span style={{ color: "#a78bfa", fontWeight: 700 }}>{gen}</span></span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "#64748b", fontSize: 12 }}>Slow</span>
          <input type="range" min={50} max={500} value={500 - speed + 50}
            onChange={e => setSpeed(500 - Number(e.target.value) + 50)}
          />
          <span style={{ color: "#64748b", fontSize: 12 }}>Fast</span>
        </div>
      </div>

      {/* PATTERNS */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ color: "#64748b", fontSize: 12 }}>Patterns:</span>
        {Object.keys(PATTERNS).map(p => (
          <button key={p} onClick={() => handlePattern(p)} style={{ padding: "3px 12px", borderRadius: 6, border: "1px solid #334155", background: "#1e293b", color: "#94a3b8", fontSize: 12, cursor: "pointer" }}>
            {p}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
        gap: 1,
        padding: "10px",
        background: "#1e293b",
        borderRadius: 8,
      }}>
        {grid.map((row: Cell[], r: number) =>
          row.map((cell: Cell, c: number) => (
            <div
              key={`${r}-${c}`}
              onClick={() => handleCellClick(r, c)}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                background: cell === 1 ? "#818cf8" : "#0f172a",
                borderRadius: 2,
                cursor: "pointer",
              }}
            />
          ))
        )}
      </div>
      <p style={{ marginTop: 8, color: "#475569", fontSize: 12 }}>Click cells to toggle them alive/dead</p>
    </div>
  );
}