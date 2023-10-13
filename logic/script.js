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
    setTimeout(() => (event.target.style.display = 'none'), 0);
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










function login(){
    console.log("\nLogin attempted:")
    console.log("Username: " + document.getElementById("username").value)
    console.log("Password: " + document.getElementById("password").value)
}
