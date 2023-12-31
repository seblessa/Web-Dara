let isLoggedIn = false; // Variable to track the login status
let rows;
let columns;
let board;
let phase = "Drop";
let playerTurn = "player1";
let selected_piece;
let selected = false;

function showWelcomeMessage(username) {
  const welcomeMessage = document.getElementById("user-welcome-message"); // Updated ID here
  welcomeMessage.textContent = `Welcome ${username}`;
  welcomeMessage.style.display = "block";
}

function showErrorMessage(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.innerText = message;
  errorMessage.style.display = "block";
}

function hideLoginDiv() {
  const loginDiv = document.querySelector(".login-container");
  loginDiv.style.display = "none";
}

function show_login_cred() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log("\nLogin Successful:");
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
  const playerPieces = document.getElementById("player1-pieces");
  playerPieces.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    const piece = document.createElement("div");
    piece.id = "player1-" + i;
    piece.classList.add("piece");
    piece.style.backgroundColor = Playercolour;
    playerPieces.appendChild(piece);
  }

  const opponentPieces = document.getElementById("player2-pieces");
  opponentPieces.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    const piece = document.createElement("div");
    piece.id = "player2-" + i;
    piece.classList.add("piece");
    piece.style.backgroundColor = Opponentcolour;
    opponentPieces.appendChild(piece);
  }
}

// Minimax function for DARA
/*
function minimaxDARA(board, depth, maximizingPlayer) {
  // Implement your DARA minimax logic here
  if (depth === 0 || // Game over condition for DARA ) {
    // Evaluate the board state and return a score based on DARA rules
    return evaluateDARA(board);
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    let bestMove = null;
    for (// Each possible move in DARA ) {
      const eval = minimaxDARA(// Updated DARA board , depth - 1, false);
      if (eval > maxEval) {
        maxEval = eval;
        bestMove = // Current move ;
      }
    }
    return bestMove;
  } else {
    let minEval = Infinity;
    for (// Each possible move in DARA ) {
      const eval = minimaxDARA(// Updated DARA board , depth - 1, true);
      minEval = Math.min(minEval, eval);
    }
    return minEval;
  }
}
*/

function startGame() {
  //start move phase
  let DropabblePlayerPieces = 12;
  let DropabbleOpponentPieces = 12;
  const cells = document.querySelectorAll(".cell");
  const playerPieces = document.getElementById("player1-pieces");
  const opponentPieces = document.getElementById("player2-pieces");
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
        if (playerTurn === nick && DropabblePlayerPieces > 0) {
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
            renderPossibleMoves(parseInt(x), parseInt(y));
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
            renderPossibleMoves(parseInt(x), parseInt(y));
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
  const gameModeButtons = document.querySelectorAll(".toggle-button1");
  const boardSelectorButtons = document.querySelectorAll(".toggle-button2");
  const gameDifficulty = document.getElementById("game-difficulty");
  const gameDifficultyButton = document.querySelectorAll(".toggle-button3");
  const startButton = document.getElementById("start-button");
  const podiumContainer = document.getElementById("popup-user-table");
  const podiumTable = document.getElementById("user-table-section");
  const status = document.getElementById("status");
  const podiumButtons = document.querySelectorAll(".podium-size-buttons");
  const quitGame = document.getElementById("quit-game-button");
  const newGameButton = document.getElementById("new-game-button")
  let gameMode = null;
  let nick = null;
  let password = null;

  quitGame.style.display = "none";
  status.style.display = "none";
  gameDifficulty.style.display = "none";
  podiumContainer.style.display = "none";
  podiumTable.style.display = "none";
  errorMessage.style.display = "none";
  welcomeMessage.style.display = "none";
  gameBoard.style.display = "none";
  firstStep.style.display = "none";
  newGameButton.style.display = "none";

  function main_menu(user, password){
    isLoggedIn = login(user, password);
    if (isLoggedIn) {
      show_login_cred();
      hideLoginDiv();
      showWelcomeMessage(nick);
      newGameButton.style.display = "block";
      document.getElementById("logout-button").style.display = "block";
    }
  }

  document.getElementById("login-button").addEventListener("click", function (ev) {
    ev.preventDefault();
    nick = document.getElementById("username").value;
    password = document.getElementById("password").value;
    main_menu(nick, password);
  });

  document.getElementById("new-game-button").addEventListener("click", function () {
    firstStep.style.display = "block";
  });

  document.getElementById("rules-button").addEventListener("click", function () {
    document.getElementById("popup").style.display = "block";
  });

  document.getElementById("close-popup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
  });

  quitGame.addEventListener("click", function () {
    giveUpRequest(nick, password)
    quitGame.style.display = "none";
    status.style.display = "none";
    gameBoard.style.display = "none";
    main_menu(nick,password)
  });

  document.getElementById("logout-button").addEventListener("click", function () {
    location.reload();
  });

  gameModeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      gameModeButtons.forEach(function (b) {
        b.classList.remove("active");
        if (button.id === "ai-button") {
          gameMode = "pvAI";
          gameDifficulty.style.display = "block";
        } else {
          gameMode = "pvp";
          gameDifficulty.style.display = "none";
        }
      });
      this.classList.add("active");
    });
  });

  gameDifficultyButton.forEach(function (button) {
    button.addEventListener("click", function () {
      gameDifficultyButton.forEach(function (b) {
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

  // Show the podium when the "Podium" button is clicked
  document.getElementById("podium-button").addEventListener("click", function () {
    podiumContainer.style.display = "block";
    podiumButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        console.log(button.id);
        if (button.id === "5x6") {
          ranking(5, 6, podiumTable);
        } else if((button.id === "6x6")){
          ranking(6, 6, podiumTable);
        } else if((button.id === "6x5")){
          ranking(6, 5, podiumTable);
        }
        this.classList.add("active");
      });
    });

  });
  document.getElementById("close-popup-user-table").addEventListener("click", function () {
    podiumContainer.style.display = "none";
  });

  document.getElementById("close-popup-user-table-section").addEventListener("click", function () {
    podiumTable.style.display = "none";
    podiumTable.querySelector("tbody").innerHTML = "";
  });


  startButton.addEventListener("click", function () {
    const selectedGameModeButton = Array.from(gameModeButtons).find((button) => button.classList.contains("active"));
    const selectedBoardSelectorButton = Array.from(boardSelectorButtons).find((button) => button.classList.contains("active"));
    const selectedGameDifficulty = Array.from(gameDifficultyButton).find((button) => button.classList.contains("active"));
    const player1Colour = document.getElementById("player1-colour").value;
    const player2Colour = document.getElementById("player2-colour").value;

    //get selected colour

    if (gameMode === "pvp") {
      if (!selectedGameModeButton || !selectedBoardSelectorButton) {
        alert("Please select every option to start the game.");
      } else {
        console.log("PLAYING ONLINE");
        console.log("Game mode: " + selectedGameModeButton.textContent);
        console.log("Board size: " + selectedBoardSelectorButton.textContent);

        [rows, columns] = selectedBoardSelectorButton.textContent.split("x");

        lookForGame(nick, password, parseInt(rows), parseInt(columns), status);

        firstStep.style.display = "none";
        generateGameBoard(parseInt(rows), parseInt(columns));
        generateGamePieces(player1Colour, player2Colour);
        gameBoard.style.display = "flex";
        quitGame.style.display = "block";
      }
    } else {
      if (!selectedGameModeButton || !selectedBoardSelectorButton || !selectedGameDifficulty) {
        alert("Please select every option to start the game.");
      } else {
        console.log("PLAYING OFFLINE");
        console.log("Game mode: " + selectedGameModeButton.textContent);
        console.log("Board size: " + selectedBoardSelectorButton.textContent);
        console.log("Game difficulty: " + selectedGameDifficulty.textContent);
        // Get the selected game board size
        const boardSize = selectedBoardSelectorButton.textContent;
        [rows, columns] = boardSize.split("x");

        // Call generateGameBoard() with rows and columns
        generateGameBoard(parseInt(rows), parseInt(columns));
        generateGamePieces(player1Colour, player2Colour);

        startGame(selectedGameDifficulty.textContent);

        // Hide the 'first-step' div
        firstStep.style.display = "none";

        // Show the game board
        gameBoard.style.display = "flex";
      }
    }
  });
});
