const SERVER = "http://twserver.alunos.dcc.fc.up.pt:8008/";
//const SERVER = "http://localhost:8014/"

const group = 14;
var game = 0;
var game_board = [[]];

async function callServer(request_name, info) {
    console.log(request_name);
    console.log(info);
    return	fetch(SERVER + request_name, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(info)
    })
        .then(response => response.json());
}



// REGISTER REQUEST
async function login(usernameInput, passwordInput) {
    let login_info = {
        nick: usernameInput,
        password: passwordInput
    }

    const data = await callServer("register",login_info);

    if (data.error) {
        showErrorMessage(data.error);
        return false
    } else {
        show_login_cred();
        hideLoginDiv();
        showWelcomeMessage(usernameInput);
        document.getElementById("new-game-button").style.display = "block";
        document.getElementById("logout-button").style.display = "block";
        return true
    }
}

// TODO: JOIN REQUEST
async function lookForGame(nick, password, rows, columns,status){
    let response_json = await callServer("join", {group, nick, password, "size":{rows, columns}});
    if ("game" in response_json) {
        console.log("Sucessfuly joined a game with ID: "+ response_json.game);
        game = response_json.game;
        status.innerText = "Waiting for opponent..."
        status.style.display = "block";
        await update(nick,status);
    }
    else{
        console.log("Join failed. Response:");
        console.log(response_json);
    }
}

// TODO: LEAVE REQUEST
async function giveUpRequest(){
    let nick = document.getElementById("username-input").value;
    let password = document.getElementById("password-input").value;
    let response_json = await callServer("leave", {nick, password, game});
    if (!("error" in response_json)){
        console.log("Successfuly left the game");
        //if (document.getElementById("wait-game").style.display === "flex"){switchPage("wait-game", "menu"); game = null;}
        //else if (document.getElementById("game").style.display === "flex"){switchPage("game", "menu");}

    }
    else{
        console.log("Leave failed. Response:");
        console.log(response_json);
    }
}

// TODO: NOTIFY REQUEST
async function notify(row, column){
    let nick = document.getElementById("username-input").value;
    let password = document.getElementById("password-input").value;
    let response_json = await callServer("notify", {nick, password, game, "move":{row,column}});
    if ("error" in response_json){
        console.log("Notify error. Response:");
        console.log(response_json);
        let message = document.getElementById("text");
        message.innerText = response_json.error;
    }
    else{
        console.log("Successfuly notified the server");
    }
}


// TODO: UPDATE REQUEST (SSE)
async function update(nick,status){
    let url = SERVER + "update?nick="+nick+"&game="+game;
    const eventSource = new EventSource(url);
    eventSource.onmessage = function(message){
        let json = JSON.parse(message.data);
        console.log(json);
        if ("error" in json){
            console.log("Update error. Response:");
            console.log(json);
            // switchPage("wait-game", "menu");
        }
        if ("winner" in json){
            // in case the game is completely done / no forfeit occurs
            if ("board" in json){
                game_board = json.board;
                updateBoardPvP(game_board);
            }
            // update the game message
            console.log("Successfuly received an update from server");
            console.log("Game finished - Winner: " + json.winner);
            eventSource.close();

            status.innerText = "Winner: " + json.winner;
        }
        else if ("board" in json){
            game_board = json.board;
            console.log("Successfuly received an update from server");
            // change the board and game messages in the browser side
            let phase = json.phase;
            let step = json.step;
            let turn = json.turn;
            updateBoardPvP(game_board);
            updateMessage(status, phase, step, turn);
        }
    }
}


// TODO: RANKING REQUEST
async function ranking(){
    let size = document.getElementById("board-size-filter").options[document.getElementById("board-size-filter").selectedIndex].text;
    let rows, columns;
    if (size === "6 X 5") {
        rows = 6; columns = 5;
    } else if (size === "5 X 6") {
        rows = 5; columns = 6;
    } else if (size === "6 X 6") {
        rows = 6; columns = 6;
    } else if (size === "7 X 6") {
        rows = 7; columns = 6;
    }
    let response_json = await callServer("ranking", {group, "size": {rows,columns}});
    console.log(response_json);
    if (!("error" in response_json)){
        console.log("Successfuly received the ranking table");
        console.log(response_json);
        // generate the table here
        let table = document.getElementById("win-rate-table");
        let tbody = table.querySelector("tbody");
        // remove all rows from the tbody except the first header (header)
        while (tbody.rows.length > 1) {
            tbody.deleteRow(1);
        }
        // generate the new table
        let ranking_list = response_json.ranking;
        for (let player_stats of ranking_list){
            let row = document.createElement("tr");
            for (let [key, value] of Object.entries(player_stats)) {
                var cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }
    }
    else{
        console.log("Ranking error. Response:");
        console.log(response_json);
    }
}


// TODO: AUXILIAR FUNCTIONS

function createSideBoardsHTML() {
    for (let r = 0; r < 6; r++) {
        let row = [];
        for (let c = 0; c < 2; c++) {
            row.push(0);

            let tile_e = document.createElement("div");
            tile_e.id = "E" + r.toString() + "-" + c.toString();
            tile_e.classList.add("tile");
            let piece_img = document.createElement("img");
            piece_img.setAttribute("src", "images/player1.png");
            piece_img.setAttribute("id", "img-"+tile_e.id);
            piece_img.style.width = "100%";
            piece_img.style.height = "100%";
            tile_e.append(piece_img);
            document.getElementById("esquerda").append(tile_e);

            let tile_d = document.createElement("div");
            tile_d.id = "D" + r.toString() + "-" + c.toString();
            tile_d.classList.add("tile");
            piece_img = document.createElement("img");
            piece_img.setAttribute("src", "images/player2.png");
            piece_img.setAttribute("id", "img-"+tile_d.id);
            piece_img.style.width = "100%";
            piece_img.style.height = "100%";
            tile_d.append(piece_img);
            document.getElementById("direita").append(tile_d);
        }
    }
}

function updateBoardPvP(board){
    let color_value = {"empty":0, "white":1, "black":2};
    let piece_count = [0,0];
    // map the values "empty", "white", "black" to 0, 1, 2
    for (let i = 0; i < game_board.length; i++){
        for (let j = 0; j < game_board[0].length; j++){
            game_board[i][j] = color_value[game_board[i][j]];
            if (game_board[i][j] !== 0){ piece_count[game_board[i][j]-1]++; }
        }
    }
    // update the board
    for(let r = 0; r < board.length; r++){
        for(let c = 0; c < board[0].length; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            document.getElementById("img-"+tile.id).setAttribute("src", "images/player"+board[r][c]+".png");
        }
    }
    // update the side boards
    updateSideBoardsPvP(piece_count[0], piece_count[1]);
}

function updateSideBoardsPvP(p1_count, p2_count) {
    for (let r = 5; r >= 0; r--) {
        for (let c = 1; c >= 0; c--) {
            let tile = document.getElementById("E" + r.toString() + "-" + c.toString());
            document.getElementById("img-"+tile.id).setAttribute("src", "images/player1.png");
            if (p1_count <= 0){continue;}
            document.getElementById("img-"+tile.id).setAttribute("src", "images/player0.png");
            p1_count--;
        }
    }
    for (let r = 5; r >= 0; r--) {
        for (let c = 1; c >= 0; c--) {
            let tile = document.getElementById("D" + r.toString() + "-" + c.toString());
            document.getElementById("img-"+tile.id).setAttribute("src", "images/player2.png");
            if (p2_count <= 0){continue;}
            document.getElementById("img-"+tile.id).setAttribute("src", "images/player0.png");
            p2_count--;
        }
    }
}

function clearPvP() {
    for (let r = 0; r < game_board.length; r++) {
        for (let c = 0; c < game_board[0].length; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            if (tile != null) {
                tile.remove();
            }
        }
    }

    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 2; c++) {
            let tile_e = document.getElementById("E" + r.toString() + "-" + c.toString());
            if (tile_e != null) {
                tile_e.remove();
            }
            let tile_d = document.getElementById("D" + r.toString() + "-" + c.toString());
            if (tile_d != null) {
                tile_d.remove();
            }
        }
    }
}

function updateMessage(message, phase, step, turn){

    if (phase === "drop"){
        message.innerText = "[Drop Phase] Turn: " + turn;
    }
    else if (step === "from"){
        message.innerText = "[Move Phase - Select Piece] Turn: " + turn;
    }
    else if (step === "to"){
        message.innerText = "[Move Phase - Select Destination] Turn: " + turn;
    }
    else if (step === "take"){
        message.innerText = "[Move Phase - Take Oponent's Piece] Turn: " + turn;
    }
}
