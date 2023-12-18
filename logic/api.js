const SERVER = "http://twserver.alunos.dcc.fc.up.pt:8008/";
//const SERVER = "http://localhost:8014/"
const group = 14;
let game = 0;
let game_board = [[]];

async function callServer(request_name, info) {
  console.log(request_name);
  console.log(info);
  return fetch(SERVER + request_name, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(info),
  }).then((response) => response.json());
}

// REGISTER REQUEST
async function login(usernameInput, passwordInput) {
  let login_info = {
    nick: usernameInput,
    password: passwordInput,
  };

  const data = await callServer("register", login_info);

  if (data.error) {
    showErrorMessage(data.error);
    return false;
  } else {
    return true;
  }
}

// JOIN REQUEST
async function lookForGame(nick, password, rows, columns, status) {
  let response_json = await callServer("join", { group, nick, password, size: { rows, columns } });
  let cells = document.querySelectorAll(".cell");
  if ("game" in response_json) {
    console.log("Sucessfuly joined a game with ID: " + response_json.game);
    game = response_json.game;
    status.innerText = "Waiting for opponent...";
    status.style.display = "block";
    await update(nick, status);
    cells.forEach((cell) => {
      cell.addEventListener("click", function () {
        let row = cell.id[0];
        let column = cell.id[2];
        notify(row, column, nick, password);
      });
    });
  } else {
    console.log("Join failed. Response:");
    console.log(response_json);
  }
}

// LEAVE REQUEST
async function giveUpRequest(nick, password) {
  let response_json = await callServer("leave", { nick, password, game });
  if (!("error" in response_json)) {
    console.log("Successfuly left the game");
  } else {
    console.log("Leave failed. Response:");
    console.log(response_json);
  }
}

// NOTIFY REQUEST
async function notify(row, column, nick, password) {
  let intRow = parseInt(row);
  let intColumn = parseInt(column);
  let response_json = await callServer("notify", { nick, password, game, move: { row: intRow, column: intColumn } });
  if ("error" in response_json) {
    console.log("Notify error. Response:");
    console.log(response_json);
    let message = document.getElementById("text");
    message.innerText = response_json.error;
  } else {
    turn = response_json.turn;
    phase = response_json.phase;
    console.log("Successfuly notified the server");
  }
}

// UPDATE REQUEST
async function update(nick, status) {
  let url = SERVER + "update?nick=" + nick + "&game=" + game;
  const eventSource = new EventSource(url);
  eventSource.onmessage = function (message) {
    let json = JSON.parse(message.data);
    console.log(json);
    if ("error" in json) {
      console.log("Update error. Response:");
      console.log(json);
      // switchPage("wait-game", "menu");
    }
    if ("winner" in json) {
      // in case the game is completely done / no forfeit occurs
      if ("board" in json) {
        game_board = json.board;
        updateBoardPvP(game_board, json.phase, json.step);
      }
      // update the game message
      console.log("Successfuly received an update from server");
      console.log("Game finished - Winner: " + json.winner);
      eventSource.close();

      status.innerText = "Winner: " + json.winner;
    } else if ("board" in json) {
      game_board = json.board;
      console.log("Successfuly received an update from server");
      // change the board and game messages in the browser side
      phase = json.phase;
      step = json.step;
      turn = json.turn;
      move = json.move;
      updateMessage(status, phase, step, turn);
      updateBoardPvP(game_board, phase, step, move);
    }
  };
}

// RANKING REQUEST
async function ranking(rows, columns, table) {
  let response_json = await callServer("ranking", { group, size: { rows, columns } });
  if (!("error" in response_json)) {
    table.style.display = "block";
    console.log("Successfuly received the ranking table");
    // generate the table here
    let tbody = table.querySelector("tbody")
    // generate the new table
    let ranking_list = response_json.ranking;
    for (let player_stats of ranking_list) {
      let row = document.createElement("tr");
      for (let [key, value] of Object.entries(player_stats)) {
        let cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }


  } else {
    console.log("Ranking error. Response:");
    console.log(response_json);
  }
}

function updateBoardPvP(board, phase, step, move) {
  let color_value = { empty: 0, white: 1, black: 2 };
  let piece_count = [0, 0];
  //map the values "empty", "white", "black" to 0, 1, 2
  for (let i = 0; i < game_board.length; i++) {
    for (let j = 0; j < game_board[0].length; j++) {
      game_board[i][j] = color_value[game_board[i][j]];
      if (game_board[i][j] !== 0) {
        piece_count[game_board[i][j] - 1]++;
      }
    }
  }
  // update the board
  let player1pieces = document.getElementById("player1-pieces");
  let player2pieces = document.getElementById("player2-pieces");
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      if (board[r][c] === 1 && tile.childNodes.length === 0) {
        tile.appendChild(player1pieces.childNodes[0]);
      } else if (board[r][c] === 2 && tile.childNodes.length === 0) {
        tile.appendChild(player2pieces.childNodes[0]);
      }
    }
  }
  //take row and colum and make cell selected
  if (phase === "move" && step === "from") {
    let tile = document.getElementById(move.row.toString() + "-" + move.column.toString());
    tile.classList.add("selected");
  }
}

function updateMessage(message, phase, step, turn) {
  if (phase === "drop") {
    message.innerText = "[Drop Phase] Turn: " + turn;
  } else if (step === "from") {
    message.innerText = "[Move Phase - Select Piece] Turn: " + turn;
  } else if (step === "to") {
    message.innerText = "[Move Phase - Select Destination] Turn: " + turn;
  } else if (step === "take") {
    message.innerText = "[Move Phase - Take Oponent's Piece] Turn: " + turn;
  }
}
