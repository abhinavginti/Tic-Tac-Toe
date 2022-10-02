let CPUMode = false;
let turn = 'X'
let gameOver = false

let player = ''
let cpu = ''

const boxes = document.querySelectorAll('.__box')
const msgbox = document.querySelector('#msg-box')
// const boxContainer = document.querySelector('.__box-container')
const line = document.querySelector('#__line')

let BoxArr = ['', '', '', '', '', '', '', '', '']

msgbox.innerText = `Player ${turn}'s turn`


const resetGame = () => {
    boxes.forEach(box => {
        box.innerHTML = ''
    })
    BoxArr = ['', '', '', '', '', '', '', '', '']
    line.classList.remove('active')
    line.style.opacity = 0;
    line.style.transform = `translateX(-50%)`;
    line.style.left = '50%'
    msgbox.innerHTML = ''
    turn = 'X'
    msgbox.innerText = `Player ${turn}'s turn`
    gameOver = false;
    if (CPUMode && cpu === '') {
        const opt = prompt('Select your Player (X or O)').toUpperCase()
        if (opt === 'O') {
            player = 'O'
            cpu = 'X'
            boxes[0].innerHTML = 'X';
            BoxArr[0] = 'X'
            toggleTurn();
            //CPUMove()
            return
        } else if (opt === 'X') {
            player = 'X'
            cpu = 'O'
        } else {
            resetGame()
        }
    }
    if (cpu === 'X') {
        boxes[0].innerHTML = 'X';
        BoxArr[0] = 'X'
        toggleTurn()
        //CPUMove();
    }
}

boxes.forEach((box, idx) => {
    box.addEventListener('click', () => {
        if (!gameOver && box.innerText === '') {
            box.innerText = turn;
            BoxArr[idx] = turn
            const chkwin = checkWin(true) 
            if(!chkwin) toggleTurn();
            if (CPUMode && turn === cpu && chkwin === null) {
                CPUMove()
            }
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

const checkWin = (winStroke, Arr) => {
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

    if (Arr) {
        winConditions.forEach(win => {
            if ((Arr[win[0]] === Arr[win[1]]) && (Arr[win[1]] === Arr[win[2]])) {
                if (Arr[win[0]] !== '') winner = Arr[win[0]];
            }
        })
    }

    !Arr && winConditions.forEach(win => {
        if (equals3(boxes[win[0]], boxes[win[1]], boxes[win[2]])) {
            winner = boxes[win[0]].innerText
            if (winStroke) {
                msgbox.innerText = `Player ${boxes[win[0]].innerText} Wins`
                gameOver = true
                line.style.opacity = 1;
                if (win[3]) {
                    // line.style.left = `calc(50% - ${boxContainer.clientHeight / win[3]}px)`
                    line.style.left = `calc(50% - (30vmax / ${win[3]}))`
                }
                // line.style.transform = `translateX(-50%) translateY(${boxContainer.clientHeight / win[4]}px) rotate(${win[5]}deg)`;
                line.style.transform = `translateX(-50%) translateY(calc(30vmax / ${win[4]})) rotate(${win[5]}deg)`;
                line.classList.add('active')
            }
        }
    })

    let ifTie = true;

    boxes.forEach(box => {
        if (box.innerText === '') {
            ifTie = false;
        }
    })
    if (winner === null && ifTie) {
        msgbox.innerText = `It is a Draw`
        return 'tie'
    } else return winner
}

const toggleTurn = () => {
    turn = turn === 'X' ? 'O' : 'X';
    msgbox.innerText = `Player ${turn}'s turn`
}

const toggleMode = () => {
    const toggleBtn = document.querySelector('#toggleMode')
    CPUMode = !CPUMode;
    toggleBtn.innerText = CPUMode ? 'Single Player Mode' : 'Multi Player Mode'
    cpu = ''
    resetGame()
}

const CPUMove = () => {

    // const isWinning = () => {
    //     const chkwin = checkWin(false);
    //     if (chkwin !== null) {
    //         if (chkwin === cpu) return 1;
    //         else return 0;
    //     }
    //     return 0
    // }

    let mex = Number.MIN_SAFE_INTEGER;
    let bestMove;
    for (let i = 0; i < 9; i++) {
        if (BoxArr[i] === '') {
            BoxArr[i] = cpu;
            let score = minmax(BoxArr, false);
            BoxArr[i] = '';
            if (score > mex) {
                mex = score;
                bestMove = i;
            }
        }
    }
    boxes[bestMove].innerText = cpu;
    BoxArr[bestMove] = cpu
    let chkwin = checkWin(true)
    if(!chkwin) toggleTurn()

    // const Select = Math.floor(Math.random() * 8);
    // if (boxes[Select].innerText === '') {
    //     boxes[Select].innerText = cpu;
    //     checkWin(true)
    //     toggleTurn()
    // } else {
    //     CPUMove();
    // }
}


const minmax = (Arr, isMaximizing) => {
    let chkwin = checkWin(false, Arr);
    if (chkwin) {
        if (chkwin === cpu) return 1;
        else if (chkwin === player) return -1;
        else return 0;
    }
    if (isMaximizing) {
        let mex = Number.MIN_SAFE_INTEGER;
        for (let i = 0; i < 9; i++) {
            if (Arr[i] === '') {
                Arr[i] = cpu;
                let score = minmax(Arr, false)
                Arr[i] = '';
                mex = Math.max(mex, score);
            }
        }
        return mex;
    } else {
        let mn = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < 9; i++) {
            if (Arr[i] === '') {
                Arr[i] = player;
                let score = minmax(Arr, true);
                Arr[i] = '';
                mn = Math.min(mn, score);
            }
        }
        return mn;
    }
}
