// sudoku.js

let gameLevel = "easy"; // Default mode
let button = document.getElementById("generate-sudoku");
let solve = document.getElementById("solve");
let dropdown = document.getElementById("dropdown");
let arr = [[], [], [], [], [], [], [], [], []];
let board = [[], [], [], [], [], [], [], [], []];

// Assigning divs to an array
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    arr[i][j] = document.getElementById(i * 9 + j);
  }
}

// Setting color for the default numbers
function setColor(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== 0) {
        arr[i][j].style.color = "red";
      }
    }
  }
}

// Reset color for all cells
function resetColor() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      arr[i][j].style.color = "green";
    }
  }
}

// Update board display based on provided board state
function changeBoard(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== 0) {
        arr[i][j].innerText = board[i][j];
      } else {
        arr[i][j].innerText = "";
      }
    }
  }
}

// Request a new Sudoku board from the API based on selected difficulty
button.onclick = function () {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    resetColor();
    board = response.board;
    setColor(board);
    changeBoard(board);
  };
  xhrRequest.open(
    "get",
    `https://sugoku.herokuapp.com/board?difficulty=${gameLevel}`
  );
  xhrRequest.send();
};

// Solve the Sudoku puzzle
solve.onclick = function () {
  resetColor();
  const solvedBoard = getSolved(board);
  changeBoard(solvedBoard);
};
