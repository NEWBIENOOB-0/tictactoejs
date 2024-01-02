document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart');
    const cells = [];
    let currentPlayer = '❌';
    let gameActive = true;

    initializeBoard();

    function initializeBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
            cells.push(cell);
        }

        restartButton.addEventListener('click', restartGame);
        renderBoard();
    }

    function handleCellClick(event) {
        if (!gameActive) return;

        const clickedCell = event.target;
        const cellIndex = clickedCell.dataset.index;

        if (cells[cellIndex].textContent === '') {
            cells[cellIndex].textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === '❌' ? '⭕' : '❌';

            if (currentPlayer === '⭕' && gameActive) {
                makeComputerMove();
            }
        }
    }

    function makeComputerMove() {
        const emptyCells = cells.filter(cell => cell.textContent === '');
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const randomCell = emptyCells[randomIndex];

        if (randomCell) {
            setTimeout(() => {
                randomCell.textContent = currentPlayer;
                checkWinner();
                currentPlayer = currentPlayer === '❌' ? '⭕' : '❌';
            }, 500);
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent
            ) {
                highlightWinner(combination);
                showResult(`${currentPlayer === '❌' ? 'You' : 'Computer'} Win! 🏆`);
                gameActive = false;
                return;
            }
        }

        if (cells.every(cell => cell.textContent !== '')) {
            showResult('It\'s a Draw! 🤝');
            gameActive = false;
        }
    }

    function highlightWinner(combination) {
        for (const index of combination) {
            cells[index].style.color = 'red';
        }
    }

    function showResult(result) {
        message.textContent = result;
    }

    function renderBoard() {
        for (const cell of cells) {
            cell.textContent = '';
            cell.style.color = '#000';
        }

        message.textContent = '';
        currentPlayer = '❌';
        gameActive = true;
    }

    function restartGame() {
        for (const cell of cells) {
            cell.style.color = '#000';
        }

        renderBoard();
    }
});
