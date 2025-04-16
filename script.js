let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('.reset-btn');
let newGameButton = document.querySelector('#new-btn');
let msg = document.querySelector('#msg');
let msgContainer = document.querySelector('.msg-container');
let darkModeToggle = document.querySelector('#dark-mode-toggle');
let body = document.body;
let line = document.createElement('div'); // Line element for the winning combination
line.classList.add('win-line');
document.body.appendChild(line);

const toggleDarkMode = () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<img src="brightness.png" alt="Light Mode" width="20px" height="20px">';
    } else {
        darkModeToggle.innerHTML = '<img src="night-mode.png" alt="Dark Mode" width="20px" height="20px">';
    }
};

darkModeToggle.addEventListener('click', toggleDarkMode);

let turnO = true; // playerX , playerO

const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    line.style.display = 'none'; // Hide the line on reset
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "";
    }
};

const showWinner = (winner, winningPattern) => {
    msg.innerText = `Congratulations! Player ${winner} is Winner.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    drawWinningLine(winningPattern); // Draw the winning line
};

const draw = () => {
    msg.innerText = `Match is Draw! Try Again`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const drawWinningLine = (winningPattern) => {
    const firstBox = boxes[winningPattern[0]];
    const lastBox = boxes[winningPattern[2]];

    const firstBoxRect = firstBox.getBoundingClientRect();
    const lastBoxRect = lastBox.getBoundingClientRect();

    const lineX1 = firstBoxRect.left + firstBoxRect.width / 2;
    const lineY1 = firstBoxRect.top + firstBoxRect.height / 2;
    const lineX2 = lastBoxRect.left + lastBoxRect.width / 2;
    const lineY2 = lastBoxRect.top + lastBoxRect.height / 2;

    const angle = Math.atan2(lineY2 - lineY1, lineX2 - lineX1) * (180 / Math.PI);
    const length = Math.sqrt((lineX2 - lineX1) ** 2 + (lineY2 - lineY1) ** 2);

    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.left = `${lineX1}px`;
    line.style.top = `${lineY1}px`;
    line.style.display = 'block';
};

const checkWinner = () => {
    for (let patterns of winningCondition) {
        let pos1Val = boxes[patterns[0]].innerText;
        let pos2Val = boxes[patterns[1]].innerText;
        let pos3Val = boxes[patterns[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val, patterns);
                return;
            }
        }
    }
    // check for draw
    if ([...boxes].every(box => box.innerText !== "")) {
        draw();
    }
};

boxes.forEach(box => {
    box.addEventListener('click', () => {
        console.log('box is clicked');
        if (turnO) {
            box.innerText = 'O';
            box.style.color = "blue";
            turnO = false;
        } else {
            box.innerText = 'X';
            box.style.color = "red";
            turnO = true;
        }
        box.disabled = true;

        checkWinner(box);
    });
});

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);