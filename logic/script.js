function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log('\nLogin attempted:');
    console.log('Username: ' + username);
    console.log('Password: ' + password);
}

function generateGameBoard(rows, columns) {
    const gameBoard = document.querySelector(".game-board");
    gameBoard.innerHTML = "";

    for (let i = 0; i < rows * columns; i++) { // Use a single loop to create cells
        const cell = document.createElement("div");
        cell.classList.add("cell");
        gameBoard.appendChild(cell);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("rules-button").addEventListener("click", function() {
        document.getElementById("popup").style.display = "block";
    });

    document.getElementById("close-popup").addEventListener("click", function() {
        document.getElementById("popup").style.display = "none";
    });

    const gameBoard = document.querySelector(".game-container");
    const firstStep = document.querySelector(".first-step");
    gameBoard.style.display = "none";
    firstStep.style.display = "none";

    const gameModeButtons = document.querySelectorAll(".toggle-button1");
    const boardSelectorButtons = document.querySelectorAll(".toggle-button2");
    const startButton = document.getElementById("start-button");

    document.getElementById("new-game-button").addEventListener("click", function () {
        // Show the 'first-step' div when 'New Game' button is pressed
        firstStep.style.display = "block";
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
        }else{
            document.getElementById("start-button").addEventListener("click", function () {
                // Hide the 'first-step' div
                firstStep.style.display = "none";

                // Get the selected game board size
                const selectedBoardButton = Array.from(boardSelectorButtons).find(
                    (button) => button.classList.contains("active")
                );

                // Set game conditions and logic here
                const boardSize = selectedBoardButton.textContent;
                const [rows, columns] = boardSize.split("x");

                // Generate the game board
                generateGameBoard(parseInt(rows), parseInt(columns));

                // Show the game board
                gameBoard.style.display = "block";
            });
        }
    });


});
