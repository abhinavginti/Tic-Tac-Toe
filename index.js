let CPUMode = false;
let turn = 'X'
let gameOver = false

const boxes = document.querySelectorAll('.__box')
const msgbox = document.querySelector('#msg-box')
// const boxContainer = document.querySelector('.__box-container')
const line = document.querySelector('#__line')

const resetGame = () => {
    boxes.forEach(box => {
        box.innerHTML = ''
        gameOver = false;
        turn = 'X'
        msgbox.innerHTML = ''
        line.classList.remove('active')
        line.style.opacity = 0;
        line.style.transform = `translateX(-50%)`;
        line.style.left = '50%'
        // line.style.width = 'calc(10vmax * 3)'
    })
}

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (!gameOver && box.innerText === '') {
            box.innerText = turn;
            checkWin()
            // toggleTurn();
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
        [0, 1, 2, 0, 6, 0],
        [3, 4, 5, 0, 2, 0],
        [6, 7, 8, 0, 1.2, 0],
        [0, 3, 6, 3, 2, 90],
        [1, 4, 7, 0, 2, 90],
        [2, 5, 8, -3, 2, 90],
        [0, 4, 8, 0, 2, 45],
        [2, 4, 6, 0, 2, 135]
    ]

    let winner = null;

    winConditions.forEach(win => {
        if (equals3(boxes[win[0]], boxes[win[1]], boxes[win[2]])) {
            msgbox.innerText = `Player ${boxes[win[0]].innerText} Wins`
            gameOver = true
            winner = boxes[win[0]].innerText
            line.style.opacity = 1;
            if (win[3]) {
                // line.style.left = `calc(50% - ${boxContainer.clientHeight / win[3]}px)`
                line.style.left = `calc(50% - (30vmax / ${win[3]}))`
            }
            // line.style.transform = `translateX(-50%) translateY(${boxContainer.clientHeight / win[4]}px) rotate(${win[5]}deg)`;
            line.style.transform = `translateX(-50%) translateY(calc(30vmax / ${win[4]})) rotate(${win[5]}deg)`;
            line.classList.add('active')
        }
    })
    if (winner !== null) return winner;

    let ifTie = true;

    boxes.forEach(box => {
        if (box.innerText === '') {
            ifTie = false;
        }
    })
    if (ifTie) {
        msgbox.innerText = `It is a Draw`
        return 'tie'
    }
}

const toggleTurn = () => {
    turn = turn === 'X' ? 'O' : 'X';
}

const toggleMode = () => {
    const toggleBtn = document.querySelector('#toggleMode')
    CPUMode = !CPUMode;
    toggleBtn.innerText = CPUMode ? 'Single Player Mode' : 'Multi Player Mode'
}

