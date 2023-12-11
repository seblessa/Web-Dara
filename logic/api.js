
export const register = (nick, password) => {
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008//register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nick, password }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro:', error));
};


export const join = (group, nick, password, size) => {
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008//join', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ group, nick, password, size }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro:', error));
};

export const leave = (nick, password, game) => {
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008//leave', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nick, password, game }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro:', error));
};

export const notify = (nick, password, game, move) => {
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008//notify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nick, password, game, move }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro:', error));
};

export const update = (game, nick) => {
    const url = `http://twserver.alunos.dcc.fc.up.pt:8008//update?game=${game}&nick=${nick}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = event => {
        const data = JSON.parse(event.data);
        console.log(data);
    };

    eventSource.onerror = error => {
        console.error('Erro:', error);
        eventSource.close();
    };
};


export const getRanking = (group, size) => {
    const url = `http://twserver.alunos.dcc.fc.up.pt:8008//ranking?group=${group}&size=${size}`;
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro:', error));
};
