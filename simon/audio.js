export class Audio {
  static baseFrequency = 523.25;
  static playTone(index, duration = 2000) {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = 0.1; // Initial volume

    osc.type = "sawtooth";
    osc.frequency.value = Audio.baseFrequency + index * 110;

    //*********************************************/
    // Fade out effect to simulate Simon tone
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      ctx.currentTime + duration / 1000
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration / 1000);
  }
}
