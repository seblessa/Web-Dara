const pieces = document.querySelectorAll('.piece1, .piece2');
const cells = document.querySelectorAll('.cell');






let draggedPiece = null;

// Event listener for when a piece starts to be dragged
pieces.forEach(piece => {
    piece.addEventListener('dragstart', dragStart);
    piece.setAttribute('draggable', true);
});

// Event listener for when a piece is being dragged over a cell
cells.forEach(cell => {
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('dragleave', dragLeave);
    cell.addEventListener('drop', dragDrop);
});

// Function to handle the drag start
function dragStart(event) {
    draggedPiece = event.target;
    event.target.style.display = 'none';
}

// Functions to handle the drag over, enter, leave, and drop events
function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
    this.classList.add('hovered');
}

function dragLeave() {
    this.classList.remove('hovered');
}

function dragDrop() {
    this.classList.remove('hovered');
    this.appendChild(draggedPiece);
    draggedPiece.style.display = 'block';
}

// Login function
function login() {
    console.log('\nLogin attempted:');
    console.log('Username: ' + document.getElementById('username').value);
    console.log('Password: ' + document.getElementById('password').value);
}

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form submission
    login();
});

// Add event listeners for opening and closing the popup
const openButton = document.getElementById('rules-button');
const popup = document.getElementById('popup');
const closeButton = document.getElementById('close-popup');

openButton.addEventListener('click', () => {
    popup.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Hide the popup initially
popup.style.display = 'none';
