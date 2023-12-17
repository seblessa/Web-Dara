/*
// popup-user-table
document.addEventListener("DOMContentLoaded", function () {
    const closePopupUserTableButton = document.getElementById("close-popup-user-table");
    const popupUserTable = document.getElementById("popup-user-table");

    closePopupUserTableButton.addEventListener("click", function () {
        popupUserTable.style.display = "none";
    });
});

// Updated User data structure
let users = [user];

function addUser(username) {
    // Check if the user already exists
    const existingUser = users.find(user => user.username === username);

    if (!existingUser) {
        // If the user doesn't exist, add them to the array
        users.push({
            username: username,
            gamesWon: 0,  // Initialize games won count
        });
    }
}

function updateUser(username, gamesWon) {
    // Find the user and update their games won count
    const user = users.find(user => user.username === username);

    if (user) {
        user.gamesWon = gamesWon;
    }
}

function renderUserTable() {
    // Add logic to dynamically create the table rows based on the users array
    const tableBody = document.getElementById("user-table-body");
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        const usernameCell = document.createElement('td');
        const gamesWonCell = document.createElement('td');

        usernameCell.textContent = user.username;
        gamesWonCell.textContent = user.gamesWon;

        row.appendChild(usernameCell);
        row.appendChild(gamesWonCell);

        tableBody.appendChild(row);
    });
}

function startGame(difficulty) {
    // ... (existing code)

    // Check for a winner and update user data
    if (ThreeRow()) {
        const currentPlayer = playerTurn === "player1" ? "User 1" : "User 2";
        addUser(currentPlayer); // Add the user if not already in the array
        updateUser(currentPlayer, users.find(user => user.username === currentPlayer).gamesWon + 1);

        // Update the user table
        renderUserTable();

        // Reset the game or perform other actions as needed
    }
}*/
