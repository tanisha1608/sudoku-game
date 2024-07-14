document.addEventListener("DOMContentLoaded", function () {
    const difficultySelection = document.getElementById("difficulty-selection");
    const gameBoard = document.getElementById("game-board");
    const resetButton = document.getElementById("reset-button");
    const messageElement = document.getElementById("message");

    let board = [];
    let originalBoard = [];
    let incorrectAttempts = 0;

    // Event listeners
    resetButton.addEventListener("click", resetGame);
    document.getElementById("easy").addEventListener("click", () => startGame("easy"));
    document.getElementById("medium").addEventListener("click", () => startGame("medium"));
    document.getElementById("hard").addEventListener("click", () => startGame("hard"));

    function startGame(difficulty) {
        generateSudoku(difficulty);
        messageElement.textContent = "";
    }

    function createGameBoard() {
        gameBoard.innerHTML = "";
        for (let i = 0; i < 81; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("maxlength", "1");
            input.addEventListener("input", validateInput);
            cell.appendChild(input);
            gameBoard.appendChild(cell);
        }
    }

    function resetGame() {
        gameBoard.innerHTML = "";
        difficultySelection.style.display = "flex";
        messageElement.textContent = "";
        board = [];
        originalBoard = [];
        incorrectAttempts = 0;
    }

    function generateSudoku(difficulty) {
        let emptyCellsPercentage;
        switch (difficulty) {
            case "easy":
                emptyCellsPercentage = 0.2;
                break;
            case "medium":
                emptyCellsPercentage = 0.35;
                break;
            case "hard":
                emptyCellsPercentage = 0.5;
                break;
            default:
                emptyCellsPercentage = 0.2;
        }

        board = createFilledBoard();
        originalBoard = JSON.parse(JSON.stringify(board)); // Deep copy

        const totalCells = 81;
        const emptyCellsCount = Math.floor(totalCells * emptyCellsPercentage);

        for (let i = 0; i < emptyCellsCount; i++) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * totalCells);
            } while (board[Math.floor(randomIndex / 9)][randomIndex % 9] === 0);

            board[Math.floor(randomIndex / 9)][randomIndex % 9] = 0;
        }

        displayBoard();
        difficultySelection.style.display = "none";
    }

    function createFilledBoard() {
        // Generate a valid Sudoku board (for simplicity, using a predefined board here)
        return [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ];
    }

    function displayBoard() {
        const cells = document.querySelectorAll(".cell input");
        cells.forEach((cell, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            cell.value = board[row][col] === 0 ? "" : board[row][col];
            if (originalBoard[row][col] !== 0) {
                cell.setAttribute("readonly", true);
            }
        });
    }

    function validateInput(event) {
        const inputValue = event.target.value.trim();
        const cell = event.target.parentElement;
        const rowIndex = Array.from(cell.parentElement.children).indexOf(cell.parentElement);
        const colIndex = Array.from(cell.parentElement.children).indexOf(cell);

        if (inputValue === "") {
            board[rowIndex][colIndex] = 0;
            cell.classList.remove("green", "red");
        } else if (isValidInput(rowIndex, colIndex, parseInt(inputValue, 10))) {
            board[rowIndex][colIndex] = parseInt(inputValue, 10);
            cell.classList.remove("red");
            cell.classList.add("green");
        } else {
            board[rowIndex][colIndex] = 0;
            cell.classList.remove("green");
            cell.classList.add("red");
            incorrectAttempts++;
            if (incorrectAttempts >= 10) {
                messageElement.textContent = "Sorry, you've exceeded 10 incorrect attempts. Game over!";
                setTimeout(resetGame, 2000); // Reset after 2 seconds
            }
        }

        if (isBoardComplete()) {
            const totalIncorrectAttempts = incorrectAttempts;
            messageElement.textContent = `Hurray! You solved the Sudoku puzzle with ${totalIncorrectAttempts} incorrect attempts.`;
            setTimeout(resetGame, 2000); // Reset after 2 seconds
        }
    }

    function isValidInput(row, col, num) {
        return isRowValid(row, num) && isColValid(col, num) && isBoxValid(row, col, num);
    }

    function isRowValid(row, num) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === num) {
                return false;
            }
        }
        return true;
    }

    function isColValid(col, num) {
        for (let row = 0; row < 9; row++) {
            if (board[row][col] === num) {
                return false;
            }
        }
        return true;
    }

    function isBoxValid(startRow, startCol, num) {
        const boxStartRow = Math.floor(startRow / 3) * 3;
        const boxStartCol = Math.floor(startCol / 3) * 3;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[boxStartRow + row][boxStartCol + col] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    function isBoardComplete() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    return false;
                }
            }
        }
        return true;
    }
});
