// User object with the username and password
const user = { username: "user", password: "user" };

let isLoggedIn = false; // Variable to track the login status


function login() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    if (usernameInput === user.username && passwordInput === user.password) {
        isLoggedIn = true;
        hideLoginDiv();
        showWelcomeMessage(usernameInput);
        document.getElementById("new-game-button").style.display = "block";
    } else {
        showErrorMessage();
    }
}

function showWelcomeMessage(username) {
    const welcomeMessage = document.getElementById('user-welcome-message'); // Updated ID here
    welcomeMessage.textContent = `Welcome ${username}`;
    welcomeMessage.style.display = 'block';
}

function showErrorMessage() {
    const errorMessage = document.querySelector('.error-message');
    errorMessage.style.display = 'block';
}


function hideLoginDiv() {
    const loginDiv = document.querySelector('.login-container');
    loginDiv.style.display = 'none';
}
function ShowLoginDiv() {
    const loginDiv = document.querySelector('.login-container');
    loginDiv.style.display = 'block';
}


function show_login_cred() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log('\nLogin attempted:');
    console.log('Username: ' + username);
    console.log('Password: ' + password);
}

function generateGameBoard(rows, columns) {
    const gameBoard = document.querySelector(".game-board");
    gameBoard.innerHTML = "";
    gameBoard.style.width = (columns * ( 100 + 10 ) + 10) + "px";
    for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        gameBoard.appendChild(cell);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const welcomeMessage = document.querySelector('.welcome-message');
    const errorMessage = document.querySelector('.error-message');
    const gameBoard = document.querySelector(".game-container");
    const firstStep = document.querySelector(".first-step");
    const gameModeButtons = document.querySelectorAll(".toggle-button1");
    const boardSelectorButtons = document.querySelectorAll(".toggle-button2");
    const startButton = document.getElementById("start-button");
    const podiumContainer = document.querySelector(".podium");

    podiumContainer.style.display = "none";
    errorMessage.style.display = 'none';
    welcomeMessage.style.display = 'none';
    gameBoard.style.display = "none";
    firstStep.style.display = "none";
    document.getElementById("new-game-button").style.display = "none";

    document.getElementById("new-game-button").addEventListener("click", function () {
        firstStep.style.display = "block";
    });

    document.getElementById("rules-button").addEventListener("click", function() {
        document.getElementById("popup").style.display = "block";
    });

    document.getElementById("close-popup").addEventListener("click", function() {
        document.getElementById("popup").style.display = "none";
    });

    // Show the podium when the "Podium" button is clicked
    document.getElementById("podium-button").addEventListener("click", function () {
        podiumContainer.style.display = "block";
    });

    // Hide the podium when the "Close Podium" button is clicked
    document.getElementById("close-podium").addEventListener("click", function () {
        podiumContainer.style.display = "none";
    });

    document.getElementById('logout-button').addEventListener('click', function () {
        document.getElementById('user-welcome-message').style.display = 'none';
        document.getElementById('new-game-button').style.display = 'none'; // Hide the "New Game" button on logout
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
            this.classList.add ("active");
        });
    });

    startButton.addEventListener("click", function () {
        const selectedGameModeButton = Array.from(gameModeButtons).find((button) =>
            button.classList.contains("active")
        );
        const selectedBoardSelectorButton = Array.from(boardSelectorButtons).find(
            (button) => button.classList.contains("active")
        );

        if (!selectedGameModeButton || !selectedBoardSelectorButton) {
            alert("Please select both a game mode and a board to start the game.");
        } else {
            // Get the selected game board size
            const boardSize = selectedBoardSelectorButton.textContent;
            const [rows, columns] = boardSize.split("x");

            // Call generateGameBoard() with rows and columns
            generateGameBoard(parseInt(rows), parseInt(columns));

            // Hide the 'first-step' div
            firstStep.style.display = "none";

            // Show the game board
            gameBoard.style.display = "block";
        }
    });


});
