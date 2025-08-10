export class Audio {
  static baseFrequency = 523.25;
  static ctx = new (window.AudioContext || window.webkitAudioContext)();
  static async playTone(index, duration = 2000) {
    // Resume the AudioContext if it's suspended
    if (Audio.ctx.state === "suspended") {
      await Audio.ctx.resume();
    }

    const osc = Audio.ctx.createOscillator();
    const gain = Audio.ctx.createGain();
    gain.gain.value = 0.1; // Initial volume

    osc.type = "sawtooth";
    osc.frequency.value = Audio.baseFrequency + index * 110;

    //*********************************************/
    // Fade out effect to simulate Simon tone
    gain.gain.setValueAtTime(0.4, Audio.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      Audio.ctx.currentTime + duration / 1000
    );

    osc.connect(gain);
    gain.connect(Audio.ctx.destination);

    osc.start();
    osc.stop(Audio.ctx.currentTime + duration / 1000);
  }
}
