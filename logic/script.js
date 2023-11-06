// User object with the username and password
const user = { username: "user", password: "user" };
let isLoggedIn = false; // Variable to track the login status
let rows;
let columns;
let board;

function login() {
  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;

  if (usernameInput === user.username && passwordInput === user.password) {
    isLoggedIn = true;
    hideLoginDiv();
    showWelcomeMessage(usernameInput);
    document.getElementById("new-game-button").style.display = "block";
    document.getElementById("logout-button").style.display = "block";
  } else {
    showErrorMessage();
  }
}

function showWelcomeMessage(username) {
  const welcomeMessage = document.getElementById("user-welcome-message"); // Updated ID here
  welcomeMessage.textContent = `Welcome ${username}`;
  welcomeMessage.style.display = "block";
}

function showErrorMessage() {
  const errorMessage = document.querySelector(".error-message");
  errorMessage.style.display = "block";
}

function hideLoginDiv() {
  const loginDiv = document.querySelector(".login-container");
  loginDiv.style.display = "none";
}

function ShowLoginDiv() {
  const loginDiv = document.querySelector(".login-container");
  loginDiv.style.display = "block";
}

function show_login_cred() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log("\nLogin attempted:");
  console.log("Username: " + username);
  console.log("Password: " + password);
}

function generateGameBoard(rows, columns) {
  const gameBoard = document.querySelector(".game-board");
  gameBoard.innerHTML = "";
  gameBoard.style.width = columns * (100 + 10) + 10 + "px";
  for (let i = 0; i < rows; i++) {
    const cellRow = document.createElement("tr");
    for (let j = 0; j < columns; j++) {
      const cell = document.createElement("td");
      cell.classList.add("cell");
      cell.id = i + "-" + j;
      cellRow.appendChild(cell);
    }
    gameBoard.appendChild(cellRow);
  }
}

function generateGamePieces(Playercolour, Opponentcolour) {
  const playerPieces = document.getElementById("player-pieces");
  playerPieces.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    const piece = document.createElement("div");
    piece.id = "Playerpiece-" + i;
    piece.classList.add("piece");
    piece.style.backgroundColor = Playercolour;
    playerPieces.appendChild(piece);
  }

  const opponentPieces = document.getElementById("opponent-pieces");
  opponentPieces.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    const piece = document.createElement("div");
    piece.id = "Opponentpiece-" + i;
    piece.classList.add("piece");
    piece.style.backgroundColor = Opponentcolour;
    opponentPieces.appendChild(piece);
  }
}

function generatePossibleMoves(x, y) {
  let possibleMoves = [];
  if (x - 1 >= 0) {
    if (board[x - 1][y] == 0) {
      possibleMoves.push([x - 1, y]);
    }
  }
  if (x + 1 < rows) {
    if (board[x + 1][y] == 0) {
      possibleMoves.push([x + 1, y]);
    }
  }
  if (y - 1 >= 0) {
    if (board[x][y - 1] == 0) {
      possibleMoves.push([x, y - 1]);
    }
  }
  if (y + 1 < columns) {
    if (board[x][y + 1] == 0) {
      possibleMoves.push([x, y + 1]);
    }
  }
  return possibleMoves;
}

function renderPossibleMoves(x, y) {
  let possibleMoves = generatePossibleMoves(x, y);
  console.log(possibleMoves);
  const cells = document.querySelectorAll(".cell");
  cells.forEach(function (cell) {
    let [x, y] = cell.id.split("-");
    console.log("aos", x, y);
    if (possibleMoves.includes([parseInt(x), parseInt(y)])) {
      const possibleMove = document.createElement("div");
      possibleMove.classList.add("possible-move");
      cell.appendChild(possibleMove);
    }
  });
}
let phase = "Drop";
let playerTurn = "player1";

function startGame() {
  //start move phase
  let DropabblePlayerPieces = 12;
  let DropabbleOpponentPieces = 12;
  let TotalPlayerPieces = 12;
  let TotalOpponentPieces = 12;
  let selectedPiece = false;
  const cells = document.querySelectorAll(".cell");
  const pieces = document.querySelectorAll(".piece");
  const playerPieces = document.getElementById("player-pieces");
  const opponentPieces = document.getElementById("opponent-pieces");
  const messageBox = document.getElementById("message-box");
  messageBox.style.display = "block";
  messageBox.innerText = phase + " Phase " + playerTurn;

  board = new Array(rows);
  for (let i = 0; i < rows; i++) {
    board[i] = new Array(columns);
    for (let j = 0; j < columns; j++) {
      board[i][j] = 0;
    }
  }

  cells.forEach(function (cell) {
    cell.addEventListener("click", function () {
      let [x, y] = cell.id.split("-");
      if (phase == "Drop") {
        if (playerTurn == "player1" && DropabblePlayerPieces > 0) {
          if (board[parseInt(x)][parseInt(y)] == 0) {
            board[parseInt(x)][parseInt(y)] = 1;
            cell.appendChild(playerPieces.lastChild);
            playerTurn = "player2";
            DropabblePlayerPieces--;
          }
        } else if (playerTurn == "player2" && DropabbleOpponentPieces > 0) {
          if (board[parseInt(x)][parseInt(y)] == 0) {
            board[parseInt(x)][parseInt(y)] = 2;
            cell.appendChild(opponentPieces.lastChild);
            playerTurn = "player1";
            DropabbleOpponentPieces--;
          }
        }
      } else if (phase == "Move") {
        let [x, y] = cell.id.split("-");
        console.log(x, y);
        if (playerTurn == "player1" && board[parseInt(x)][parseInt(y)] == 1) {
          console.log("selected");
          if (cell.classList.contains("selected")) {
            cell.classList.remove("selected");
            selectedPiece = false;
            return;
          }

          if (!selectedPiece) {
            cell.classList.add("selected");
            selectedPiece = true;
          }
          renderPossibleMoves(parseInt(x), parseInt(y));
        } else if (playerTurn == "player2" && board[parseInt(x)][parseInt(y)] == 2) {
          console.log("selected");
          if (cell.classList.contains("selected")) {
            cell.classList.remove("selected");
            selectedPiece = false;
            return;
          }
          if (!selectedPiece) {
            cell.classList.add("selected");
            selectedPiece = true;
          }
          renderPossibleMoves(parseInt(x), parseInt(y));
        }
      }
      if (DropabblePlayerPieces == 0 && DropabbleOpponentPieces == 0) {
        phase = "Move";
      }
      messageBox.innerText = phase + " Phase " + playerTurn;
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const welcomeMessage = document.querySelector(".welcome-message");
  const errorMessage = document.querySelector(".error-message");
  const gameBoard = document.querySelector(".game-container");
  const firstStep = document.querySelector(".first-step");
  const gameModeButtons = document.querySelectorAll(".toggle-button1");
  const boardSelectorButtons = document.querySelectorAll(".toggle-button2");
  const startButton = document.getElementById("start-button");
  const podiumContainer = document.querySelector(".podium");

  podiumContainer.style.display = "none";
  errorMessage.style.display = "none";
  welcomeMessage.style.display = "none";
  gameBoard.style.display = "none";
  firstStep.style.display = "none";
  document.getElementById("new-game-button").style.display = "none";

  document.getElementById("new-game-button").addEventListener("click", function () {
    firstStep.style.display = "block";
  });

  document.getElementById("rules-button").addEventListener("click", function () {
    document.getElementById("popup").style.display = "block";
  });

  document.getElementById("close-popup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
  });

  document.getElementById("logout-button").addEventListener("click", function () {
    document.getElementById("user-welcome-message").style.display = "none";
    document.getElementById("logout-button").style.display = "none";
    document.getElementById("new-game-button").style.display = "none"; // Hide the "New Game" button on logout
    document.getElementById("game-board").style.display = "none"; // Hide the game board on logout
  });

  gameModeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      gameModeButtons.forEach(function (b) {
        b.classList.remove("active");
      });
      this.classList.add("active");
    });
  });

  boardSelectorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      boardSelectorButtons.forEach(function (b) {
        b.classList.remove("active");
      });
      this.classList.add("active");
    });
  });

  startButton.addEventListener("click", function () {
    const selectedGameModeButton = Array.from(gameModeButtons).find((button) => button.classList.contains("active"));
    const selectedBoardSelectorButton = Array.from(boardSelectorButtons).find((button) => button.classList.contains("active"));
    const player1Colour = document.getElementById("player1-colour").value;
    const player2Colour = document.getElementById("player2-colour").value;

    //get selected colour

    if (!selectedGameModeButton || !selectedBoardSelectorButton) {
      alert("Please select both a game mode and a board to start the game.");
    } else {
      // Get the selected game board size
      const boardSize = selectedBoardSelectorButton.textContent;
      [rows, columns] = boardSize.split("x");

      // Call generateGameBoard() with rows and columns
      generateGameBoard(parseInt(rows), parseInt(columns));
      generateGamePieces(player1Colour, player2Colour);
      startGame();

      // Hide the 'first-step' div
      firstStep.style.display = "none";

      // Show the game board
      gameBoard.style.display = "flex";
    }
  });
  // Show the podium when the "Podium" button is clicked
  document.getElementById("podium-button").addEventListener("click", function () {
    podiumContainer.style.display = "block";
  });
  // Hide the podium when the "Close Podium" button is clicked
  document.getElementById("close-podium").addEventListener("click", function () {
    podiumContainer.style.display = "none";
  });
});
