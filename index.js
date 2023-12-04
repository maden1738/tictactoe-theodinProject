const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const displayBoard = () => {
    let boardHtml = "";
    board.forEach((el, index) => {
      boardHtml += `<div class = "grid" id = ${index}>${el}</div>`;
    });
    document.getElementById("gameboard").innerHTML = boardHtml;
  };
  return { displayBoard };
})();

const createPlayer = (name, sign) => {
  return { name, sign };
};

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;
  const start = () => {
    players = [
      createPlayer(document.getElementById("player1").value, "O"),
      createPlayer(document.getElementById("player2").value, "X"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.displayBoard();
  };

  return { start };
})();

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector("#start-game");
  startButton.addEventListener("click", () => {
    Game.start();
  });
});
