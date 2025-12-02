const board = document.getElementById("board");
const solveButton = document.getElementById("solve-button");
const clearButton = document.getElementById("clear-button");

for (let r = 0; r < 9; r++) {
  for (let c = 0; c < 9; c++) {
    const box = Math.floor(r / 3) * 3 + Math.floor(c / 3);

    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.row = r;
    cell.dataset.col = c;
    cell.dataset.box = box;

    const input = document.createElement("input");
    input.type = "text";
    input.inputMode = "numeric";
    input.maxLength = 1;
    input.pattern = "[1-9]";
    input.setAttribute("aria-label", `fila ${r + 1} columna ${c + 1}`);

    cell.appendChild(input);
    board.appendChild(cell);
  }
}

function getBoard() {
  const boardArray = [];
  for (let r = 0; r < 9; r++) {
    const row = [];
    for (let c = 0; c < 9; c++) {
      const input = board.querySelector(`.cell[data-row='${r}'][data-col='${c}'] input`);
      row.push(parseInt(input.value) || 0);
    }
    boardArray.push(row);
  }
  return boardArray;
}

function setBoard(boardArray) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const input = board.querySelector(`.cell[data-row='${r}'][data-col='${c}'] input`);
      input.value = boardArray[r][c] || "";
    }
  }
}

function isValid(board, row, col, num) {

  for (let c = 0; c < 9; c++) if (board[row][c] === num) return false;

  for (let r = 0; r < 9; r++) if (board[r][col] === num) return false;

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[startRow + r][startCol + c] === num) return false;
    }
  }

  return true;
}

function isBoardValid(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const num = board[r][c];
      if (num !== 0) {
        board[r][c] = 0;
        if (!isValid(board, r, c, num)) {
          board[r][c] = num;
          return false;
        }
        board[r][c] = num;
      }
    }
  }
  return true;
}

function solve(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, r, c, num)) {
            board[r][c] = num;
            if (solve(board)) return true;
            board[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

clearButton.addEventListener("click", () => {
  const inputs = board.querySelectorAll("input");
  inputs.forEach(input => input.value = "");
});

solveButton.addEventListener("click", () => {
  const boardArray = getBoard();

  if (!isBoardValid(boardArray)) {
    alert("Hay números duplicados en fila, columna o caja. Corrige el tablero.");
    return;
  }

  if (solve(boardArray)) {
    setBoard(boardArray);
  } else {
    alert("No tiene solución.");
  }
});