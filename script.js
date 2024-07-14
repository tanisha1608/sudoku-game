// Initialize Sudoku grid variable
let sudokuGrid = [];

// Function to generate a random Sudoku grid
function generateRandomSudoku() {
    sudokuGrid = []; // Clear previous grid
    const emptyPercentage = 40; // Adjust this to change the percentage of empty cells

    // Initialize the grid with empty cells
    for (let i = 0; i < 9; i++) {
        sudokuGrid.push([]);
        for (let j = 0; j < 9; j++) {
            sudokuGrid[i].push(0); // 0 represents an empty cell
        }
    }

    // Fill the grid with random numbers that satisfy Sudoku rules
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (Math.random() * 100 <= (100 - emptyPercentage)) {
                let num;
                do {
                    num = Math.floor(Math.random() * 9) + 1;
                } while (!isValid(i, j, num));
                sudokuGrid[i][j] = num;
            }
        }
    }

    // Generate the board with input fields
    generateBoard();
}

// Function to check if a number can be placed in a particular cell
function isValid(row, col, num) {
    // Check row
    for (let i = 0; i < 9; i++) {
        if (sudokuGrid[row][i] === num) {
            return false;
        }
    }

    // Check column
    for (let i = 0; i < 9; i++) {
        if (sudokuGrid[i][col] === num) {
            return false;
        }
    }

    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (sudokuGrid[i][j] === num) {
                return false;
            }
        }
    }

    return true;
}

// Function to generate the Sudoku board with input fields
function generateBoard() {
    const board = document.querySelector('.board');
    board.innerHTML = '';

    // Populate the board with cells and input fields
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // Create input fields for editable cells
            if (sudokuGrid[i][j] === 0) {
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.classList.add('input-cell');
                input.dataset.row = i;
                input.dataset.col = j;
                cell.appendChild(input);
            } else {
                cell.textContent = sudokuGrid[i][j];
            }

            board.appendChild(cell);
        }
    }
}

// Function to check the solution (not implemented in this basic example)
function checkSolution() {
    alert('Checking solution...');
}

// Event listener for input cells
document.addEventListener('input', function(e) {
    const input = e.target;
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    const value = parseInt(input.value);

    // Update the Sudoku grid with the user input
    sudokuGrid[row][col] = value;
});

// Initial generation of Sudoku board
generateRandomSudoku();
