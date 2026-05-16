// DOM Elements
const board = document.getElementById('board')
const cells = document.querySelectorAll('.cell')
const resetButton = document.getElementById('reset-button')
const scoreX = document.getElementById('score-x')
const scoreO = document.getElementById('score-o')

// Game State
let currentPlayer = 'X' // Tracks whose turn it is
let gameState = ['', '', '', '', '', '', '', '', ''] // Represents the 3x3 board
let gameActive = true // Prevents moves after the game ends
let score = { X: 0, O: 0 } // Persistent score tracking

// All possible winning combinations (indices in the gameState array)
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
]

/* Handles clicking on a game cell */
function handleCellClick(event) {
    const cell = event.target
    const index = parseInt(cell.dataset.index)

    // Ignore click if cell is already filled or game is over
    if (gameState[index] !== '' || !gameActive) return

    // Record the move and update the display
    gameState[index] = currentPlayer
    cell.textContent = currentPlayer

    // Check for win
    const winCondition = getWinCondition()
    if (winCondition) {
        highlightWinningCells(winCondition)
        score[currentPlayer]++
        updateScore()
        gameActive = false
        // Small timeout to ensure the UI updates before the alert blocks the thread
        setTimeout(() => alert(`${currentPlayer} won!`), 10)
        return
    }

    // Check for draw (no empty cells left)
    if (checkDraw()) {
        gameActive = false
        setTimeout(() => alert('Tie!'), 10)
        return
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
}

/* Checks if the current player has a winning combination, @returns {Array|null}, the winning combination indices or null if no win */
function getWinCondition() {
    return winningConditions.find((condition) => {
        return condition.every((index) => {
            return gameState[index] === currentPlayer
        })
    })
}

/* Checks if all cells are filled (draw condition) */
function checkDraw() {
    return gameState.every((cell) => cell !== '')
}

/*Updates the score display in the UI */
function updateScore() {
    scoreX.textContent = score.X
    scoreO.textContent = score.O
}

/*Highlights the winning cells by changing their text color */
function highlightWinningCells(condition) {
    condition.forEach((index) => {
        cells[index].style.color = 'red'
    })
}

/*Resets the game board for a new round (keeps scores) */
function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', '']
    cells.forEach((cell) => {
        cell.textContent = ''
        cell.style.color = ''
    })
    currentPlayer = 'X'
    gameActive = true
}

// Event Listeners
cells.forEach((cell) => cell.addEventListener('click', handleCellClick))
resetButton.addEventListener('click', resetGame)
