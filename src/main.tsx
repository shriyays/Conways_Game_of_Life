/* `StrictMode` here is acting as a wrapper component. 
It doesn't render anything visible to the screen 
— it's invisible. What it actually does is intercept the 
rendering of everything inside it and runs extra checks on 
your code during development. */
import { StrictMode } from "react";

/* this is the function that actually boots up React and 
attaches it to the browser's HTML. */
import { createRoot } from "react-dom/client";

//Imports our GameOfLife component from GameOfLife.tsx.
import GameOfLife from "./GameOfLife";

/* Renders our GameOfLife component inside StrictMode into that 
root div. This is what actually puts everything on the screen.
The ! at the end is TypeScript saying "I promise this element 
exists, don't worry." */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameOfLife />
  </StrictMode>
);