window.onload = function () {
    let boxes = document.querySelectorAll(".box");
    let resetBtn = document.querySelector("#reset-btn");
    let newGameBtn = document.querySelector("#newBtn");
    let msg = document.querySelector("#msg");
    let userScoreElem = document.querySelector("#user-score");
    let compScoreElem = document.querySelector("#comp-score");

    let userScore = 0;
    let compScore = 0;
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    const resetGame = () => {
        gameActive = true;
        msg.innerText = "Your Turn!";
        boxes.forEach(box => {
            box.innerText = "";
            box.disabled = false;
        });
    };

    const showWinner = (winner) => {
        msg.innerText = `🎉 Winner: ${winner}`;
        gameActive = false;

        if (winner === "O") {
            userScore++;
            userScoreElem.innerText = userScore;
        } else {
            compScore++;
            compScoreElem.innerText = compScore;
        }

        disableBoxes();
    };

    const checkWinner = () => {
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            let boxA = boxes[a].innerText;
            let boxB = boxes[b].innerText;
            let boxC = boxes[c].innerText;

            if (boxA !== "" && boxA === boxB && boxB === boxC) {
                showWinner(boxA);
                return;
            }
        }

        let isDraw = [...boxes].every(box => box.innerText !== "");
        if (isDraw) {
            msg.innerText = "It's a Draw!";
            gameActive = false;
        }
    };

    const disableBoxes = () => {
        boxes.forEach(box => box.disabled = true);
    };

    const computerMove = () => {
        if (!gameActive) return;

        let emptyBoxes = [...boxes].filter(box => box.innerText === "");
        if (emptyBoxes.length === 0) return;

        setTimeout(() => { 
            let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
            randomBox.innerText = "X";
            randomBox.disabled = true;
            checkWinner();
        }, 700);
    };

    boxes.forEach(box => {
        box.addEventListener("click", () => {
            if (!gameActive || box.innerText !== "") return;

            box.innerText = "O";
            box.disabled = true;

            checkWinner();

            if (gameActive) {
                computerMove();
            }
        });
    });

    newGameBtn.addEventListener("click", resetGame);
    resetBtn.addEventListener("click", resetGame);
};
