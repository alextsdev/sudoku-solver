test

const { isValid, isBoardValid, solve } = require("./sudoku");

// Tablero vacío
const emptyBoard = Array.from({ length: 9 }, () => Array(9).fill(0));

describe("Sudoku solver", () => {

  test("isValid permite colocar número válido", () => {
    const board = emptyBoard.map(r => [...r]);
    board[0][0] = 5;

    expect(isValid(board, 0, 1, 5)).toBe(false);
    expect(isValid(board, 1, 0, 5)).toBe(false);
    expect(isValid(board, 1, 1, 5)).toBe(false);
  });

  test("isBoardValid detecta duplicados", () => {
    const board = emptyBoard.map(r => [...r]);
    board[0][0] = 7;
    board[0][1] = 7;

    expect(isBoardValid(board)).toBe(false);
  });

  test("solver resuelve sudoku vacío", () => {
    const board = emptyBoard.map(r => [...r]);

    const result = solve(board);

    expect(result).toBe(true);
    expect(board.flat().every(n => n >= 1 && n <= 9)).toBe(true);
  });

  test("solver respeta números iniciales", () => {
    const board = emptyBoard.map(r => [...r]);
    board[0][0] = 9;

    solve(board);

    expect(board[0][0]).toBe(9);
  });

});
