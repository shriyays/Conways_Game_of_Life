
# 🧬 Conway's Game of Life

A clean, interactive implementation of Conway's Game of Life built with **React**, **TypeScript**, and **Vite**. Watch emergent complexity arise from just 4 simple rules — draw your own patterns, load classics, and control the simulation in real time.

---

## ✨ Features

- **Interactive grid** — click to toggle cells alive or dead
- **Play / Pause / Step** — run the simulation or step through it one generation at a time
- **Speed control** — adjust the simulation speed with a slider
- **Built-in patterns** — load classic patterns like Glider, Blinker, Block, Beacon, and Pulsar
- **Random fill** — generate a random starting state
- **Generation counter** — track how many generations have passed
- **Clean TypeScript** — fully typed with strict `Cell` and `Grid` types

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20.19+ or v22.12+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/Conways_Game_of_Life.git

# Navigate into the project
cd Conways_Game_of_Life

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🎮 How to Use

1. **Draw** — click any cell on the grid to toggle it alive (purple) or dead (dark)
2. **Load a pattern** — click any pattern button (Glider, Pulsar, etc.) to load it onto the grid
3. **Play** — hit the Play button to start the simulation
4. **Step** — use the Step button to advance one generation at a time
5. **Speed** — drag the slider to control how fast the simulation runs
6. **Random** — fill the grid with a random pattern and see what evolves
7. **Clear** — reset the grid and start fresh

---

## 📹 Tutorial

> Video walkthrough coming soon ...

---

## 📐 The 4 Rules

Every tick, each cell checks its 8 neighbors and applies one of these rules simultaneously:

| Rule            | Condition                               | Result   |
| --------------- | --------------------------------------- | -------- |
| Underpopulation | Live cell with < 2 live neighbors       | Dies     |
| Survival        | Live cell with 2 or 3 live neighbors    | Survives |
| Overpopulation  | Live cell with > 3 live neighbors       | Dies     |
| Reproduction    | Dead cell with exactly 3 live neighbors | Born     |

---

## 🗂 Project Structure

```
src/
├── types.ts          # Cell & Grid type definitions
├── grid.ts           # Grid creation helpers
├── rules.ts          # Neighbor counting & next generation logic
├── GameOfLife.tsx    # Main React component & UI
└── main.tsx          # App entry point
```

---

## 🛠 Tech Stack

- [React](https://react.dev/) — UI and state management
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [Vite](https://vitejs.dev/) — build tool and dev server

---

## 📚 Further Reading

- [Conway&#39;s Game of Life — Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- [Emergent Complexity](https://en.wikipedia.org/wiki/Emergence)
- [Cellular Automata](https://en.wikipedia.org/wiki/Cellular_automaton)

---

## 📄 License

MIT — feel free to use, modify, and share.
