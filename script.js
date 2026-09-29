let currentPlayer = "X";

let board = ["", "", "", "", "", "", "", "", ""];

let scoreX = 0;
let scoreO = 0;

let draws = 0;
let round = 1;

let gameOver = false;

const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");

const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");

const totalX = document.getElementById("totalX");
const totalO = document.getElementById("totalO");
const drawCount = document.getElementById("drawCount");
const roundNumber = document.getElementById("roundNumber");

const restartButton = document.getElementById("restart");

const drawPopup = document.getElementById("drawPopup");
const playAgain = document.getElementById("playAgain");

const winnerPopup = document.getElementById("winnerPopup");
const winnerMessage = document.getElementById("winnerMessage");
const winnerPlayAgain = document.getElementById("winnerPlayAgain");


const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


cells.forEach(function(cell) {

    cell.addEventListener("click", function() {

        let index = cell.getAttribute("data-index");

        if (board[index] !== "" || gameOver) {
            return;
        }

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;


        if (currentPlayer === "X") {
            cell.classList.add("x-player");
        } else {
            cell.classList.add("o-player");
        }


        let winner = checkWinner();


        if (winner) {

            status.textContent = "PLAYER " + currentPlayer + " WINS!";

            winnerMessage.textContent =
                "PLAYER " + currentPlayer + " WINS!";

if (currentPlayer === "X") {

    scoreX++;

    scoreXElement.textContent = scoreX;
    totalX.textContent = scoreX;

}else {

    scoreO++;

    scoreOElement.textContent = scoreO;
    totalO.textContent = scoreO;
}

round++;
roundNumber.textContent = round;

            gameOver = true;

            winnerPopup.style.display = "block";

            return;
        }


       if (board.every(function(cell) {
    return cell !== "";
})) {

    status.textContent = "GAME DRAW!";

    draws++;
    drawCount.textContent = draws;

    round++;
roundNumber.textContent = round;

    gameOver = true;

    drawPopup.style.display = "block";

    return;
}

        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }


        status.textContent =
            "PLAYER " + currentPlayer + "'S TURN";

    });

});


function checkWinner() {

    for (let pattern of winningPatterns) {

        let a = pattern[0];
        let b = pattern[1];
        let c = pattern[2];


        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {

            cells[a].classList.add("winner");

            cells[b].classList.add("winner");

            cells[c].classList.add("winner");

            return true;
        }
    }

    return false;
}


function resetBoard() {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameOver = false;


    cells.forEach(function(cell) {

        cell.textContent = "";

        cell.classList.remove("winner");

        cell.classList.remove("x-player");

        cell.classList.remove("o-player");

    });


    status.textContent = "PLAYER X'S TURN";

    drawPopup.style.display = "none";

    winnerPopup.style.display = "none";
}


restartButton.addEventListener("click", function() {

    resetBoard();

});


playAgain.addEventListener("click", function() {

    resetBoard();

});


winnerPlayAgain.addEventListener("click", function() {

    resetBoard();

});