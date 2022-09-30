let CPUMode = false;
let turn = 'X'
let gameOver = false

const boxes = document.querySelectorAll('.__box')
const msgbox = document.querySelector('#msg-box')

const resetGame = () => {
    boxes.forEach(box => {
        box.innerHTML = ''
        gameOver = false;
        turn = 'X'
        msgbox.innerHTML = ''
    })
}

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (!gameOver) {
            box.innerText = turn;
            checkWin()
            toggleTurn();
        }
    })
})

const equals3 = (a, b, c) => {
    a = a.innerText;
    b = b.innerText;
    c = c.innerText;
    if (a === '') return false;
    return a === b ? b === c ? true : false : false;
}

const checkWin = () => {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    winConditions.forEach(win => {
        if (equals3(boxes[win[0]], boxes[win[1]], boxes[win[2]])) {
            msgbox.innerText = `Player ${turn} Wins`
            gameOver = true
        }
    })
}

const toggleTurn = () => {
    turn = turn === 'X' ? 'O' : 'X';
}

const toggleMode = () => {
    const toggleBtn = document.querySelector('#toggleMode')
    CPUMode = !CPUMode;
    toggleBtn.innerText = CPUMode ? 'Single Player Mode' : 'Multi Player Mode'
}

