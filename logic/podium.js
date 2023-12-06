// User data structure
const users = [
    { username: "User 1", gamesWon: 10 },
    { username: "User 2", gamesWon: 8 },
    { username: "User 3", gamesWon: 5 }
    // Add more user data as needed
];

// Function to update the user table
function updateUserTable() {
    const tableBody = document.getElementById("user-table-body");

    // Clear existing rows
    tableBody.innerHTML = "";

    // Iterate through user data and add rows to the table
    users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${user.username}</td><td>${user.gamesWon}</td>`;
        tableBody.appendChild(row);
    });
}
function startGame(difficulty) {
    // ... (existing code)

    // Check for a winner and update user data
    if (/* Condition for winning the game */) {
        const currentPlayer = playerTurn === "player1" ? "User 1" : "User 2";
        const currentUser = users.find(user => user.username === currentPlayer);

        if (currentUser) {
            currentUser.gamesWon++;
            // Update the user table
            updateUserTable();
        }

        // Reset the game or perform other actions as needed
    }
}