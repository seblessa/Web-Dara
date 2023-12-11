let isLoggedIn = false; // Variable to track the login status
let rows;
let columns;
let board;
let phase = "Drop";
let playerTurn;
let selected_piece;
let selected = false;


import { register } from "./api.js";


let admin_details = {
    nick: "admin",
    password: "admin"
    }

function login() {
  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;

  let login_info =  {
    nick: usernameInput,
    password: passwordInput
  }

  // let message = register(JSON.stringify(login_info));

  // console.log(message);

  if (!(usernameInput===admin_details.nick && passwordInput===admin_details.password)){
    //showErrorMessage(message);
    console.log("Login Failed");
  }else {
    show_login_cred();
    hideLoginDiv();
    showWelcomeMessage(usernameInput);
    document.getElementById("new-game-button").style.display = "block";
    document.getElementById("logout-button").style.display = "block";
  }

}

function showWelcomeMessage(username) {
  const welcomeMessage = document.getElementById("user-welcome-message"); // Updated ID here
  welcomeMessage.textContent = `Welcome ${username}`;
  welcomeMessage.style.display = "block";
}

function showErrorMessage(message) {
  const errorMessage = document.getElementById("error-message")
  errorMessage.innerText = message;
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

// DARA board evaluation function (customize based on DARA rules)
function evaluateDARA(board) {
  // Evaluate the DARA board state and return a score
  // Consider factors like piece positions, connections, and game status
  // Return a higher score if the board favors the maximizing player
  // Return a lower score if the board favors the minimizing player
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

  // Define a function to handle the AI's move based on the chosen difficulty
  function handleAIMove() {
    if (difficulty === "Easy") {
      // Implement a random player AI logic here

      // Generate a random available move
      const availableMoves = [];
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (board[i][j] === 0) {
            availableMoves.push({ x: i, y: j });
          }
        }
      }

      if (availableMoves.length > 0) {
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        const { x, y } = randomMove;

        // Update the board and move the AI piece
        board[x][y] = 2; // Assuming AI's pieces are represented by 2
        const cell = document.getElementById(`cell-${x}-${y}`);
        cell.appendChild(opponentPieces.lastChild);
        playerTurn = "player1"; // Switch back to the player's turn

        // Update the remaining pieces count for the AI
        DropabbleOpponentPieces--;
      }
    } else if (difficulty === "Medium") {
      // Call minimaxDARA function with low depth
      //const bestMove = minimaxDARA(board, /* specify the depth */, false);
      // Apply the best move to the DARA board
      // Update the DARA game state
      // ...
    } else if (difficulty === "Hard") {
      // Call minimaxDARA function with deep depth
      //const bestMove = minimaxDARA(board, /* specify a deeper depth */, false);
      // Apply the best move to the DARA board
      // Update the DARA game state
      // ...
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
  const firstPlayerButtons = document.querySelectorAll(".toggle-button0");
  const gameModeButtons = document.querySelectorAll(".toggle-button1");
  const boardSelectorButtons = document.querySelectorAll(".toggle-button2");
  const gameDifficulty = document.querySelectorAll(".toggle-button3");
  const startButton = document.getElementById("start-button");
  const podiumContainer = document.querySelector(".podium");

  // updateUserTable();            // TODO: Complete podium

  podiumContainer.style.display = "none";
  errorMessage.style.display = "none";
  welcomeMessage.style.display = "none";
  gameBoard.style.display = "none";
  firstStep.style.display = "none";

  document.getElementById("login-button").addEventListener("click", function (ev) {
    ev.preventDefault();
    login();
  });

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

      startGame(selectedGameDifficulty.textContent);

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
