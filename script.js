let board = [
  ["0", "1", "2"],
  ["3", "4", "5"],
  ["6", "7", "8"],
];

const gridOfCells = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let playerTurn = document.getElementById("player-turn");
let countTurns = 0;
let playerChange = true;

let row;
let column;

let scoreX = 0;
let scoreO = 0;
let scoreXHtml = document.getElementById("score-x");
let scoreOHtml = document.getElementById("score-o");

let playAgain = document.getElementById("play-again");

function addSymbol(cell) {
  if (cell.innerText !== "") return;
  cell.innerText = currentPlayer;
  const placeInBoard = cell.id;
  cell.style.pointerEvents = "none";

  row = placeInBoard.charAt(0);
  column = placeInBoard.charAt(1);

  board[row][column] = currentPlayer;
}

function changePlayer(gameEnd, playerChange) {
  if (gameEnd) return;
  if (!playerChange) return;
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  playerTurn.textContent = `${currentPlayer}'s turn`;
  countTurns++;
}

function nextRound() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  playerTurn.textContent = `${currentPlayer}'s turn`;
}

function checkScore(countTurns) {
  if (countTurns > 3) {
    for (let i = 0; i <= 2; i++) {
      {
        if (board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
          return true;
        } else if (board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
          return true;
        }
      }
    }
    if (
      (board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
      (board[2][0] === board[1][1] && board[2][0] === board[0][2])
    ) {
      return true;
    }
  }
  return false;
}

function checkWinner(gameEnded) {
  if (gameEnded) {
    playerTurn.textContent = `${currentPlayer} wins`;
    countTurns = 0;
    playAgain.style.visibility = "visible";
    gridOfCells.style.pointerEvents = "none";
    if (currentPlayer == "X") {
      scoreX++;
      scoreXHtml.innerText = scoreX;
    } else {
      scoreO++;
      scoreOHtml.innerText = scoreO;
    }
  } else if (countTurns === 8) {
    playerTurn.textContent = `Tie game!`;
    countTurns = 0;
    playAgain.style.visibility = "visible";
    playerChange = false;
  }
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    addSymbol(cell);
    const gameEnd = checkScore(countTurns);
    checkWinner(gameEnd);
    changePlayer(gameEnd, playerChange);
  });
});

playAgain.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.style.pointerEvents = "";
  });
  board = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
  ];
  nextRound();
  countTurns = 0;
  playAgain.style.visibility = "hidden";
  gridOfCells.style.pointerEvents = "";
  playerChange = !playerChange ? true : playerChange;
});

//////////////////////////////////////////////////////////////////////////////////

function createPlayer(name) {
  const playerName = name;

  let score = 0;
  const addToScore = () => score++;

  return { playerName, addToScore };
}

const GameBoard = function () {
  let board = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
  ];

  let currentPlayer = "X";
  let countTurns = 0;
  let playerChange = true;

  let row;
  let column;

  let scoreX = 0;
  let scoreO = 0;

  //made for displaying
  const addSymbol = (cell) => {
    if (cell.innerText !== "") return;
    cell.innerText = currentPlayer;
    const placeInBoard = cell.id;
    cell.style.pointerEvents = "none";

    //needs to be separate function
    row = placeInBoard.charAt(0);
    column = placeInBoard.charAt(1);

    board[row][column] = currentPlayer;
  };

  const placeSymbolInBoard = () => {
    
  };

  //made for displaying
  const changePlayer = (gameEnd) => {
    if (gameEnd) return;
    if (!playerChange) return;
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }

    playerTurn.textContent = `${currentPlayer}'s turn`;
    countTurns++;
  };

  //game logic
  const nextRound = () => {
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }

    playerTurn.textContent = `${currentPlayer}'s turn`;
  };

  //game logic
  const checkScore = (countTurns) => {
    if (countTurns > 3) {
      for (let i = 0; i <= 2; i++) {
        {
          if (board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            return true;
          } else if (
            board[0][i] === board[1][i] &&
            board[0][i] === board[2][i]
          ) {
            return true;
          }
        }
      }
      if (
        (board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
        (board[2][0] === board[1][1] && board[2][0] === board[0][2])
      ) {
        return true;
      }
    }
    return false;
  };

  //very mixed needs to be separated, but i would say its in the game logic
  const checkWinner = (gameEnded) => {
    if (gameEnded) {
      playerTurn.textContent = `${currentPlayer} wins`;
      countTurns = 0;
      playAgain.style.visibility = "visible";
      gridOfCells.style.pointerEvents = "none";
      if (currentPlayer == "X") {
        scoreX++;
        scoreXHtml.innerText = scoreX;
      } else {
        scoreO++;
        scoreOHtml.innerText = scoreO;
      }
    } else if (countTurns === 8) {
      playerTurn.textContent = `Tie game!`;
      countTurns = 0;
      playAgain.style.visibility = "visible";
      playerChange = false;
    }
  };

  return { addSymbol, changePlayer, nextRound, checkScore, checkWinner };
};

const interfaceOfGame = function () {};

let playerX = createPlayer("X");

let playerO = createPlayer("O");
