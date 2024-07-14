// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".grid-cell");

    // Function to generate a random Sudoku board
    function generateRandomSudoku() {
        let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        nums = shuffle(nums); // Shuffle the numbers array for randomness

        // Reset all cells to empty
        cells.forEach(cell => {
            cell.textContent = "";
        });

        // Fill the Sudoku board with random numbers
        let index = 0;
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const num = nums[index % 9];
                cells[row * 9 + col].textContent = num;
                index++;
            }
            nums = nums.slice(3).concat(nums.slice(0, 3)); // Rotate nums array for next row
        }
    }

    // Function to shuffle an array (Fisher-Yates shuffle)
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Event listeners for buttons
    document.getElementById("generate-sudoku").addEventListener("click", generateRandomSudoku);

    // Initial generation of Sudoku board on page load
    generateRandomSudoku();
});
