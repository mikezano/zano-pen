import { Audio } from "./audio.js";
export class Simon {
  #sequence = [];
  #playerSequence = [];
  #level = 1;
  #sequenceLength = 3;
  #isPlayingSequence = false;
  #isPlayingAudio = false;
  #segments = null;
  #levelEl = null;
  #startEl = null;

  constructor() {}

  resetGame() {
    this.#sequence = [];
    this.#playerSequence = [];
    this.#level = "-";
    this.#sequenceLength = 3;
    this.#isPlayingSequence = false;
    this.#isPlayingAudio = false;
    this.#levelEl.textContent = this.#level;
    this.#startEl.classList.remove("enabled");
  }

  hasSegments() {
    return this.#segments !== null && this.#segments.length > 0;
  }

  async handlePlayerClick(index) {
    if (this.#isPlayingSequence || this.#isPlayingAudio) return;
    this.#isPlayingAudio = true;

    Audio.playTone(index);
    await this.brightenSegment(index);
    this.#playerSequence.push(index);

    // Check player's input against the sequence so far
    for (let i = 0; i < this.#playerSequence.length; i++) {
      if (this.#playerSequence[i] !== this.#sequence[i]) {
        alert("Game Over!");
        this.resetGame();
        return;
      }
    }

    // If full correct sequence guessed
    if (this.#playerSequence.length === this.#sequence.length) {
      this.#levelEl.textContent = `${++this.#level}`;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.generateNextSequence(this.#sequenceLength++);
      this.playSequence();
    }
    this.#isPlayingAudio = false;
  }

  enableClicks(segments) {
    this.#segments = segments;
    this.#segments.forEach((el, index) => {
      el.addEventListener("click", async () => {
        console.log(`Segment ${index} clicked`);
        await this.handlePlayerClick(index);
      });
    });
  }

  generateNextSequence = () => {
    const nextSequence = [];
    for (let i = 0; i < this.#sequenceLength; i++) {
      nextSequence.push(Math.floor(Math.random() * 4));
    }
    console.log("New sequence generated:", nextSequence);
    this.#sequence = nextSequence;
  };

  async playSequence() {
    this.#isPlayingSequence = true;
    for (const index of this.#sequence) {
      await this.brightenSegment(index);
      //delay for 200ms between tones
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    this.#isPlayingSequence = false;
    this.#playerSequence = []; // Reset player sequence after playing the sequence
  }

  async brightenSegment(index) {
    return new Promise((resolve) => {
      const el = this.#segments[index];
      el.classList.add("brighten");
      Audio.playTone(index);
      setTimeout(() => {
        el.classList.remove("brighten");
        resolve();
      }, 500);
    });
  }

  start(levelEl, startEl) {
    this.#levelEl = levelEl;
    this.#level = 1;
    console.log("Starting game at level:", this.#level);
    levelEl.textContent = this.#level;
    this.#startEl = startEl;
    this.#startEl.classList.add("enabled");
    this.generateNextSequence(this.#sequenceLength);
    console.log("New sequence generated:", this.#sequence);
    this.playSequence();
  }
}
