let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (!isGameOver && box.innerHTML === "") {
            box.innerHTML = turn; // Place "X" or "O"
            checkWin();            // Check for win
            checkDraw();           // Check for draw
            changeTurn();          // Change turn to the other player
        }
    });
});

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";  // Move the indicator
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";    // Move the indicator
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical
        [0, 4, 8], [2, 4, 6]               // Diagonal
    ];

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = `${turn} Wins!`;
            document.querySelector("#play-again").style.display = "inline";
            boxes[a].style.backgroundColor = "#08D9D6";
            boxes[b].style.backgroundColor = "#08D9D6";
            boxes[c].style.backgroundColor = "#08D9D6";
            break;
        }
    }
}

function checkDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach((box) => {
            if (box.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "It's a Draw!";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

// Play Again
document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";  // Reset indicator
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach((box) => {
        box.innerHTML = "";
        box.style.backgroundColor = "#fff";
        box.style.color = "#d161ff";
    });
});
