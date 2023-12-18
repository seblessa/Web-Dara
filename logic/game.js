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
            if (!MoreThanThreeRow(x - 1, y)) possibleMoves[x - 1][y] = 1;
        }
    }
    if (x + 1 < rows) {
        if (board[x + 1][y] === 0) {
            if (!MoreThanThreeRow(x + 1, y)) possibleMoves[x + 1][y] = 1;
        }
    }
    if (y - 1 >= 0) {
        if (board[x][y - 1] === 0) {
            if (!MoreThanThreeRow(x, y - 1)) possibleMoves[x][y - 1] = 1;
        }
    }
    if (y + 1 < columns) {
        if (board[x][y + 1] === 0) {
            if (!MoreThanThreeRow(x, y + 1)) possibleMoves[x][y + 1] = 1;
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

function MoreThanThreeRow(x, y) {
    //check if the move to the x and y made more than 3 in a row

    for (let i = x - 3; i < 7; i++) {
        if (i < 0) continue;
        if (i >= columns - 3) break;
        if (board[i][y] === board[i + 1][y] && board[i + 1][y] === board[i + 2][y] && board[i + 2][y] === board[i + 3][y]) {
            return true;
        }
    }

    for (let i = y - 3; i < 7; i++) {
        if (i < 0) continue;
        if (i >= rows - 3) break;
        if (board[x][i] === board[x][i + 1] && board[x][i + 1] === board[x][i + 2] && board[x][i + 2] === board[x][i + 3]) {
            return true;
        }
    }
    return false;
}

function ThreeRow(x, y) {
    for (let i = x - 2; i < 5; i++) {
        if (i < 0) continue;
        if (i >= columns - 2) break;
        if (board[i][y] === board[i + 1][y] && board[i + 1][y] === board[i + 2][y]) {
            return true;
        }
    }

    for (let i = y - 2; i < 5; i++) {
        if (i < 0) continue;
        if (i >= rows - 2) break;
        if (board[x][i] === board[x][i + 1] && board[x][i + 1] === board[x][i + 2]) {
            return true;
        }
    }

    return false;
}

function renderPossibleMoves(x, y) {
    let possibleMoves = generatePossibleMoves(x, y);
    console.log(possibleMoves);
    const cells = document.querySelectorAll(".cell");

    // Remove existing possible-move elements
    document.querySelectorAll(".possible-move").forEach(function (possibleMove) {
        possibleMove.remove();
    });

    cells.forEach(function (cell) {
        let [i, j] = cell.id.split("-");
        if (possibleMoves[parseInt(i)][parseInt(j)] === 1 && board[parseInt(i)][parseInt(j)] === 0) {
            const possibleMove = document.createElement("div");
            possibleMove.classList.add("possible-move");
            cell.appendChild(possibleMove);

            // Add click event listener to each possible move
            possibleMove.addEventListener("click", function () {
                // Call your move piece logic here
                // For example, you can call a function like makeMove(x, y, i, j);
                // Update the logic based on your requirements
            });
        }
    });
}


    document.querySelectorAll(".possible-move").forEach(function (possibleMove) {
        possibleMove.addEventListener("click", function () {
            let [startX, startY] = selected_piece.parentNode.id.split("-");
            let [x, y] = possibleMove.parentNode.id.split("-");
            if (phase === "Move") {
                if (playerTurn === "player1") {
                    makeMove(x, y, startX, startY, possibleMove);
                    console.log("player2", ThreeRow(parseInt(x), parseInt(y)));
                    playerTurn = "player2";
                } else if (playerTurn === "player2") {
                    makeMove(x, y, startX, startY, possibleMove);
                    console.log("player2", ThreeRow(parseInt(x), parseInt(y)));
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
