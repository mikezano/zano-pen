import { Simon } from "./simon.js";
const simon = new Simon();
document.addEventListener("DOMContentLoaded", () => {});

let sequence = [];
let sequenceLength = 3;
let level = 0;
let playerSequence = [];
let isPlayingSequence = false;

const segment = document.querySelectorAll("#simon > div");
const brightenSegment = (index) => {
  return new Promise((resolve) => {
    const el = segment[index];
    el.classList.add("brighten");
    playTone(523.25 + index * 110);
    setTimeout(() => {
      el.classList.remove("brighten");
      resolve();
    }, 500);
  });
};

const generateNextSequence = (length) => {
  const nextSequence = [];
  for (let i = 0; i < length; i++) {
    nextSequence.push(Math.floor(Math.random() * 4));
  }
  return nextSequence;
};

async function playSequence() {
  isPlayingSequence = true;
  for (const index of sequence) {
    await brightenSegment(index);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  isPlayingSequence = false;
  playerSequence = []; // Reset player sequence after playing the sequence
}

const handlePlayerClick = async (index) => {
  if (isPlayingSequence) return;

  playTone(523.25 + index * 110);
  await brightenSegment(index);
  playerSequence.push(index);

  // Check player's input against the sequence so far
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== sequence[i]) {
      alert("Game Over!");
      resetGame();
      return;
    }
  }

  // If full correct sequence guessed
  if (playerSequence.length === sequence.length) {
    level++;
    var levelEl = document.getElementById("center");
    levelEl.textContent = `${++sequenceLength}`;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    sequence = generateNextSequence(++sequenceLength);
    console.log("New sequence generated:", sequence);
    console.log(typeof obj);
    playSequence();
  }
};

const enableClicks = () => {
  segment.forEach((el, index) => {
    el.addEventListener("click", async () => {
      handlePlayerClick(index);
    });
  });
};

function resetGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
}

// function playTone(freq, duration = 2000) {
//   const ctx = new AudioContext();
//   const osc = ctx.createOscillator();
//   const gain = ctx.createGain();
//   gain.gain.value = 0.1; // Initial volume

//   osc.type = 'sawtooth';
//   osc.frequency.value = freq;

//   //osc.connect(gain);
//  // gain.connect(ctx.destination);

// //   osc.start();
// //   gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration / 1000);
// //   osc.stop(ctx.currentTime + duration / 1000);

//   //*********************************************/
//   // Fade out effect to simulate Simon tone
//   gain.gain.setValueAtTime(0.4, ctx.currentTime);
//   gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration / 1000);

//   osc.connect(gain);
//   gain.connect(ctx.destination);

//   osc.start();
//   osc.stop(ctx.currentTime + duration / 1000);
// }

document.getElementById("start").addEventListener("click", () => {
  console.log("Start button clicked");
  const segments = document.querySelectorAll("#simon > div");
  simon.enableClicks(segments);
  simon.start();
  //sequence = generateNextSequence(sequenceLength);
  //playSequence();
});
