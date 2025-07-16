// JavaScript for simon
document.addEventListener('DOMContentLoaded', () => {
    console.log('simon initialized');
});

// const colors = new Map(
//     [1, 'yellow'], 
//     [2, 'blue'],
//     [3, 'red'],
//     [4, 'green']
// );

const segment = document.querySelectorAll('#simon > div');
console.log(segment);
const brightenSegment = (index) =>{
    return new Promise((resolve)=>{
        const el = segment[index];
        el.classList.add('brighten');
        setTimeout(() => {
            el.classList.remove('brighten');
            resolve();
        }, 1000);
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

const sequence = generateRandomSequence(10);
playSequence(sequence);