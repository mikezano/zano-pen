import { Simon } from "./simon.js";
const simon = new Simon();
document.getElementById("start").addEventListener("click", () => {
  console.log("Start button clicked");
  if (!simon.hasSegments()) {
    const segments = document.querySelectorAll("#simon > div");
    simon.enableClicks(segments);
  }
  const levelEl = document.getElementById("level");
  const startEl = document.getElementById("start");
  simon.start(levelEl, startEl);
});
