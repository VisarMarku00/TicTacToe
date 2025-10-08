//Game logic
const GameLogic = () => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let currentPlayer = "X";
  let countTurns = 0;
  let playerChange = true;
  let row;
  let column;
  let scoreX = 0;
  let scoreO = 0;
  let winner = "";

  function placeInBoard(row, column) {
    if (board[row][column] === "") {
      board[row][column] = currentPlayer;
    }

    if (countTurns >= 4) {
      checkBoard();
    }

    if (winner !== "") {
      return;
    }

    changePlayer();

    countTurns++;
  }

  function changePlayer() {
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
  }

  function checkBoard() {
    if (countTurns >= 4) {
      for (let i = 0; i <= 2; i++) {
        {
          if (board[i][0] !== "" && board[i][1] !== "" && board[i][2] !== "") {
            if (board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
              winner = currentPlayer;
            }
          }
          if (board[0][i] !== "" && board[1][i] !== "" && board[2][i] !== "") {
            if (board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
              winner = currentPlayer;
            }
          }
        }
      }
      if (
        (board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
        (board[2][0] === board[1][1] && board[2][0] === board[0][2])
      ) {
        winner = currentPlayer;
      }
    }
  }

  function winnerScore() {
    if (winner === "X") {
      return ++scoreX;
    } else if (winner === "O") {
      return ++scoreO;
    }
  }

  function resetGame() {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    countTurns = 0;
    currentPlayer = "X";
    winner = "";
  }

  return {
    getBoard() {
      return board;
    },
    placeInBoard,
    getPlayer() {
      return currentPlayer;
    },
    winnerScore,
    getWinner() {
      return winner;
    },
    resetGame,
    getCountTurns(){
      return countTurns;
    }
  };
};

//UI logic

const UiLogic = () => {
  const game = GameLogic();
  const gridOfCells = document.getElementById("board");
  const cells = document.querySelectorAll(".cell");
  let playerTurn = document.getElementById("player-turn");
  let scoreXHtml = document.getElementById("score-x");
  let scoreOHtml = document.getElementById("score-o");
  let playAgainButton = document.getElementById("play-again");

  function renderBoard() {
    let board = game.getBoard();
    cells.forEach((cell) => {
      let placeInArray = cell.id;
      let row = placeInArray.charAt(0);
      let column = placeInArray.charAt(1);

      cell.textContent = board[row][column];
    });
  }

  function makeCellsFunctional() {
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        let placeInArray = cell.id;
        let row = placeInArray.charAt(0);
        let column = placeInArray.charAt(1);

        game.placeInBoard(row, column);
        renderBoard();
        if (game.getWinner() != "" || game.getCountTurns() === 9) {
          endGameScreen();
        } else {
          playerTurn.textContent = `${game.getPlayer()}'s turn`;
        }
      });
    });
  }

  function playAgain() {
      game.resetGame();
      playAgainButton.style.visibility = "hidden";
      gridOfCells.style.pointerEvents = "";
      playerTurn.textContent = `${game.getPlayer()}'s turn`;
      renderBoard();
  }

  function endGameScreen() {
    let winner = game.getWinner();
    if (winner == "X" || winner == "O") {
      playerTurn.textContent = `${winner} wins`;
      if (winner == "X") {
        scoreXHtml.innerText = game.winnerScore();
      } else {
        scoreOHtml.innerText = game.winnerScore();
      }
    } else {
      playerTurn.textContent = `Tie game!`;
    }

    gridOfCells.style.pointerEvents = "none";
    playAgainButton.style.visibility = "visible";
  }

  function init() {
    renderBoard();
    makeCellsFunctional();
    playAgainButton.addEventListener("click", playAgain);
    playAgainButton.style.visibility = "hidden";
    playerTurn.textContent = `${game.getPlayer()}'s turn`;
  }

  return {
    init,
  };
};

UiLogic().init();
