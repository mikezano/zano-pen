// JavaScript for tic-tac-toe

let currentPlayer
document.addEventListener('DOMContentLoaded', () => {
    console.log('tic-tac-toe initialized');
});

const Player = {
    current: "X",
    next() {
        this.current = this.current === "X" ? "O" : "X";
        return this.current;
    }
};

document.getElementById('board').addEventListener('click',()=>{
    console.log('Board clicked');
});
