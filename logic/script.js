// User object with the username and password
const user = { username: "user", password: "user" };
let isLoggedIn = false; // Variable to track the login status
let rows;
let columns;
let board;
let phase = "Drop";
let playerTurn;
let selected_piece;
let selected = false;
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
  let possibleMoves = new Array(rows);
  for (let i = 0; i < rows; i++) {
    possibleMoves[i] = new Array(columns);
    for (let j = 0; j < columns; j++) {
      possibleMoves[i][j] = 0;
    }
  }
  if (x - 1 >= 0) {
    if (board[x - 1][y] === 0) {
      possibleMoves[x - 1][y] = 1;
    }
  }
  if (x + 1 < rows) {
    if (board[x + 1][y] === 0) {
      possibleMoves[x + 1][y] = 1;
    }
  }
  if (y - 1 >= 0) {
    if (board[x][y - 1] === 0) {
      possibleMoves[x][y - 1] = 1;
    }
  }
  if (y + 1 < columns) {
    if (board[x][y + 1] === 0) {
      possibleMoves[x][y + 1] = 1;
    }
  }
  return possibleMoves;
}

function makeMove(x, y, startX, startY, possibleMove) {
  board[parseInt(x)][parseInt(y)] = board[parseInt(startX)][parseInt(startY)];
  board[parseInt(startX)][parseInt(startY)] = 0;
  possibleMove.parentNode.appendChild(selected_piece);
  selected_piece = null;
  selected = false;
}

function canCapture(x, y) {
  //check if the move to the x and y made a 3 in a row

  if (board[x][y + 1] === board[x][y]) {
    if (board[x][y + 2] === board[x][y]) {
      return true;
    }
  }
  if (board[x + 1][y] === board[x][y]) {
    if (board[x + 2][y] === board[x][y]) {
      return true;
    }
  }

  if (board[x][y - 1] === board[x][y]) {
    if (board[x][y - 2] === board[x][y]) {
      return true;
    }
  }

  if (board[x - 1][y] === board[x][y]) {
    if (board[x - 2][y] === board[x][y]) {
      return true;
    }
  }

  return false;
}

function renderPossibleMoves(x, y, playerTurn) {
  let possibleMoves = generatePossibleMoves(x, y);
  console.log(possibleMoves);
  const cells = document.querySelectorAll(".cell");
  cells.forEach(function (cell) {
    let [x, y] = cell.id.split("-");
    if (possibleMoves[parseInt(x)][parseInt(y)] === 1) {
      const possibleMove = document.createElement("div");
      possibleMove.classList.add("possible-move");
      cell.appendChild(possibleMove);
    }
  });

  document.querySelectorAll(".possible-move").forEach(function (possibleMove) {
    possibleMove.addEventListener("click", function () {
      let [startX, startY] = selected_piece.parentNode.id.split("-");
      let [x, y] = possibleMove.parentNode.id.split("-");
      if (phase === "Move") {
        if (playerTurn === "player1") {
          makeMove(x, y, startX, startY, possibleMove);
          console.log("player2", canCapture(parseInt(x), parseInt(y)));

          playerTurn = "player2";
        } else if (playerTurn === "player2") {
          makeMove(x, y, startX, startY, possibleMove);
          console.log("player2", canCapture(parseInt(x), parseInt(y)));
          playerTurn = "player1";
        }
      }
      document.querySelectorAll(".selected").forEach(function (selected) {
        selected.classList.remove("selected");
      });
      document.querySelectorAll(".possible-move").forEach(function (possibleMove) {
        possibleMove.remove();
      });
      document.getElementById("message-box").innerText = phase + " Phase " + playerTurn;
    });
  });
}

function startGame(difficulty) {
  //start move phase
  let DropabblePlayerPieces = 12;
  let DropabbleOpponentPieces = 12;
  let TotalPlayerPieces = 12;
  let TotalOpponentPieces = 12;
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
      if (phase === "Drop") {
        if (playerTurn === "player1" && DropabblePlayerPieces > 0) {
          if (board[parseInt(x)][parseInt(y)] === 0) {
            board[parseInt(x)][parseInt(y)] = 1;
            cell.appendChild(playerPieces.lastChild);
            playerTurn = "player2";
            DropabblePlayerPieces--;
          }
        } else if (playerTurn === "player2" && DropabbleOpponentPieces > 0) {
          if (board[parseInt(x)][parseInt(y)] === 0) {
            board[parseInt(x)][parseInt(y)] = 2;
            cell.appendChild(opponentPieces.lastChild);
            playerTurn = "player1";
            DropabbleOpponentPieces--;
          }
        }
      } else if (phase === "Move") {
        let [x, y] = cell.id.split("-");
        console.log(x, y);
        if (playerTurn === "player1" && board[parseInt(x)][parseInt(y)] === 1) {
          console.log("selected");
          if (cell.classList.contains("selected")) {
            cell.classList.remove("selected");
            selected = false;
            document.querySelectorAll(".possible-move").forEach(function (possibleMove) {
              possibleMove.remove();
            });
            return;
          }
          if (!selected) {
            cell.classList.add("selected");
            selected_piece = cell.childNodes[0];
            selected = true;
            renderPossibleMoves(parseInt(x), parseInt(y), playerTurn);
          }
        } else if (playerTurn === "player2" && board[parseInt(x)][parseInt(y)] === 2) {
          console.log("selected");
          if (cell.classList.contains("selected")) {
            cell.classList.remove("selected");
            selected = false;
            document.querySelectorAll(".possible-move").forEach(function (possibleMove) {
              possibleMove.remove();
            });
            return;
          }
          if (!selected) {
            cell.classList.add("selected");
            selected_piece = cell.childNodes[0];
            selected = true;
            renderPossibleMoves(parseInt(x), parseInt(y), playerTurn);
          }
        }
      }
      if (DropabblePlayerPieces === 0 && DropabbleOpponentPieces === 0) {
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
  const firstPlayerButtons = document.querySelectorAll(".toggle-button0");
  const gameModeButtons = document.querySelectorAll(".toggle-button1");
  const boardSelectorButtons = document.querySelectorAll(".toggle-button2");
  const gameDifficulty = document.querySelectorAll(".toggle-button3");
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

  firstPlayerButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      firstPlayerButtons.forEach(function (b) {
        b.classList.remove("active");
      });
      this.classList.add("active");
    });
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

  gameDifficulty.forEach(function (button) {
    button.addEventListener("click", function () {
      gameDifficulty.forEach(function (b) {
        b.classList.remove("active");
      });
      this.classList.add("active");
    });
  });

  startButton.addEventListener("click", function () {
    const firstPlayer = Array.from(firstPlayerButtons).find((button) => button.classList.contains("active"));
    const selectedGameModeButton = Array.from(gameModeButtons).find((button) => button.classList.contains("active"));
    const selectedBoardSelectorButton = Array.from(boardSelectorButtons).find((button) => button.classList.contains("active"));
    const selectedGameDifficulty = Array.from(gameDifficulty).find((button) => button.classList.contains("active"));
    const player1Colour = document.getElementById("player1-colour").value;
    const player2Colour = document.getElementById("player2-colour").value;

    //get selected colour

    if (!firstPlayer || !selectedGameModeButton || !selectedBoardSelectorButton || !selectedGameDifficulty) {
      alert("Please select every option to start the game.");
    } else {
      console.log("First player: " + firstPlayer.textContent);
      console.log("Game mode: " + selectedGameModeButton.textContent);
      console.log("Board size: " + selectedBoardSelectorButton.textContent);
      console.log("Game difficulty: " + selectedGameDifficulty.textContent);
      // Get the selected game board size
      const boardSize = selectedBoardSelectorButton.textContent;
      [rows, columns] = boardSize.split("x");

      // Call generateGameBoard() with rows and columns
      generateGameBoard(parseInt(rows), parseInt(columns));
      generateGamePieces(player1Colour, player2Colour);

      if (firstPlayer.textContent === "Player 1") {
        playerTurn = "player1";
      } else {
        playerTurn = "player2";
      }

      startGame(selectedGameDifficulty.textContent, playerTurn);

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
