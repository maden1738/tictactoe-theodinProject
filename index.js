const displayController = (() => {
  const renderMessage = (message) => {
    document.querySelector("#message").innerHTML = message;
  };
  return { renderMessage };
})();

const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const displayBoard = () => {
    let boardHtml = "";
    board.forEach((el, index) => {
      boardHtml += `<div class = "grid" id = ${index}>${el}</div>`;
    });
    document.getElementById("gameboard").innerHTML = boardHtml;
    let boxes = document.querySelectorAll(".grid");
    boxes.forEach((box) => {
      box.addEventListener("click", Game.handleClick);
    });
  };

  const updateBoard = (index, sign) => {
    board[index] = sign; // updating board
    displayBoard(); // updating display of board in browser
  };

  const getGameboard = () => board; // so that we can access board element from Game()

  return { displayBoard, updateBoard, getGameboard };
})();

const createPlayer = (name, sign) => {
  return { name, sign };
};

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    console.log("inside start");
    players = [
      createPlayer(document.getElementById("player1").value, "O"),
      createPlayer(document.getElementById("player2").value, "X"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.displayBoard();
  };

  const handleClick = (event) => {
    if (gameOver) {
      return;
    }
    let index = event.target.id;
    if (Gameboard.getGameboard()[index] !== "") return; // so that we cant mark already marked spot
    Gameboard.updateBoard(index, players[currentPlayerIndex].sign);
    if (checkForWin(Gameboard.getGameboard())) {
      gameOver = true;
      displayController.renderMessage(
        `${players[currentPlayerIndex].name} wins`
      );
    } else if (checkForTie(Gameboard.getGameboard())) {
      gameOver = false;
      displayController.renderMessage("Its a tie");
    }
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0; // if 0 change to 1 and vice versa
  };

  const checkForWin = (board) => {
    const winningCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [0, 3, 6],
      [2, 4, 6],
    ];

    for (i = 0; i < winningCombination.length; i++) {
      const [a, b, c] = winningCombination[i];
      if (board[a] && board[a] === board[b] && board[b] == board[c])
        return true;
    }
    return false;
  };

  const checkForTie = (board) => {
    return board.every((cell) => cell !== "");
  };

  const restart = () => {
    for (i = 0; i < 9; i++) {
      Gameboard.updateBoard(i, "");
    }
    document.querySelector("#message").innerHTML = "";
    gameOver = false;
    Gameboard.displayBoard();
  };

  return { start, handleClick, restart };
})();

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector("#start-game");
  startButton.addEventListener("click", () => {
    Game.start();
  });

  const restartButton = document.querySelector("#restart-game");
  restartButton.addEventListener("click", () => {
    Game.restart();
  });
});
