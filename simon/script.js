// JavaScript for simon
document.addEventListener('DOMContentLoaded', () => {
    console.log('simon initialized');
});

let sequence = [];
let sequenceLength = 3;

const segment = document.querySelectorAll('#simon > div');
const brightenSegment = (index) =>{
    return new Promise((resolve)=>{
        const el = segment[index];
        el.classList.add('brighten');
        playTone(523.25 + index * 110);
        setTimeout(() => {
            el.classList.remove('brighten');
            resolve();
        }, 500);
    })
}

const generateRandomSequence = (length) =>{
    const sequence = [];
    for(let i=0; i<length; i++){
        sequence.push(Math.floor(Math.random() * 4));
    }
    return sequence;
}

async function playSequence(sequence) {
    for (const index of sequence) {
        await brightenSegment(index);
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}

const enableClicks = () => {
    segment.forEach((el, index) => {
        el.addEventListener('click', async (el) => {
            //if this click is not part of the sequence, game over
            playTone(523.25 + index * 110); // C5, D5, E5, F5
            await brightenSegment(index);

        });
    });
};

function playTone(freq, duration = 2000) {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  gain.gain.value = 0.1; // Initial volume

  osc.type = 'sawtooth';
  osc.frequency.value = freq;

  //osc.connect(gain);
 // gain.connect(ctx.destination);

//   osc.start();
//   gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration / 1000);
//   osc.stop(ctx.currentTime + duration / 1000);

  //*********************************************/
  // Fade out effect to simulate Simon tone
  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration / 1000);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + duration / 1000);
}


document.getElementById('start').addEventListener('click', () => {
    console.log('Start button clicked');
    enableClicks();
    sequence = generateRandomSequence(sequenceLength);
    playSequence(sequence);
});
// Example: Play blue tone
//enableClicks()
//playTone(523.25); // C5

//const sequence = generateRandomSequence(10);
//playSequence(sequence);



