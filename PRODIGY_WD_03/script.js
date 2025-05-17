const state = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    gameOver: false,
    scores: {
        X: 0,
        O: 0,
        ties: 0
    }
};

// Winning combinations-------
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');
const xScoreElement = document.getElementById('x-score');
const oScoreElement = document.getElementById('o-score');
const tiesElement = document.getElementById('ties');

cells.forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell));
});

resetButton.addEventListener('click', resetGame);

//Cell click Handle------
function handleCellClick(cell) {
    const index = cell.dataset.index;
    
    // Check if cell is already filled or game is over
    if (state.board[index] !== '' || state.gameOver) {
        return;
    }
    
    // Update board state
    state.board[index] = state.currentPlayer;
    
    // Update UI
    cell.textContent = state.currentPlayer;
    cell.classList.add(state.currentPlayer.toLowerCase());
    
    // Check for win or draw
    if (checkWin()) {
        state.gameOver = true;
        statusElement.textContent = `${state.currentPlayer} wins!`;
        alert(`${state.currentPlayer} wins!`);
        state.scores[state.currentPlayer]++;
        updateScoreboard();
    } else if (checkDraw()) {
        state.gameOver = true;
        statusElement.textContent = "It's a draw!";
        alert("It's a draw!");
        state.scores.ties++;
        updateScoreboard();
    } else {
        // Switch player
        state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `${state.currentPlayer}'s turn`;
    }
}

// Check for win
function checkWin() {
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return state.board[index] === state.currentPlayer;
        });
    });
}

// Check for draw
function checkDraw() {
    return state.board.every(cell => cell !== '');
}

// Reset game
function resetGame() {
    state.board = Array(9).fill('');
    state.gameOver = false;
    state.currentPlayer = 'X';
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    
    statusElement.textContent = "X's turn";
}

// Update scoreboard
function updateScoreboard() {
    xScoreElement.textContent = state.scores.X;
    oScoreElement.textContent = state.scores.O;
    tiesElement.textContent = state.scores.ties;
}