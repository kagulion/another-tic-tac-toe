const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let score = { X: 0, O: 0 };

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (gameState[index] !== '' || !gameActive) return;
    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWin()) {
        highlightWinningCells();
        score[currentPlayer]++;
        updateScore();
        alert(`${currentPlayer} won!`);
        gameActive = false;
        return;
    }
    if (checkDraw()) {
        alert('Tie!');
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function updateScore() {
    scoreX.textContent = score.X;
    scoreO.textContent = score.O;
}

function highlightWinningCells() {
    const winningCondition = winningConditions.find(condition => {
        return condition.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });

    if (winningCondition) {
        winningCondition.forEach(index => {
            cells[index].style.color = 'red';
        });
    }
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '';
    });
    currentPlayer = 'X';
    gameActive = true;
}

let gameActive = true;
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);