import { Simon } from "./simon.js";
const simon = new Simon();
document.getElementById("start").addEventListener("click", () => {
  console.log("Start button clicked");
  const segments = document.querySelectorAll("#simon > div");
  simon.enableClicks(segments);
  simon.start();
});
