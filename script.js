'use strict';

let randomNumberX, randomNumberY, gameBoard;
initialize();

function initialize(){
    randomNumberX = 0, randomNumberY = 0;
    gameBoard = [   [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]    ];

    randomSpawnNumber();
    randomSpawnNumber();
    updateTiles();
}

function randomSpawnNumber(){
    let temp = [...gameBoard[0], ...gameBoard[1], ...gameBoard[2], ...gameBoard[3]]
    let flag = 1;
    for (let i = 0; i < temp.length; i++){
        if (temp[i] === 0){
            break;
        } else if (temp[15] !== 0 && i === 15){
            flag = 0;
        }
    }
    if (flag){
        randomNumberX = Math.trunc(Math.random() * 4);
        randomNumberY = Math.trunc(Math.random() * 4);
        while (gameBoard[randomNumberX][randomNumberY] !== 0){
            randomNumberX = Math.trunc(Math.random() * 4);
            randomNumberY = Math.trunc(Math.random() * 4);
        }
        let spawn4 = Math.random();
        if (spawn4 < 0.1){
            gameBoard[randomNumberX][randomNumberY] = 4;
        } else {
            gameBoard[randomNumberX][randomNumberY] = 2;
        }
    }
}

function addRightwards(arrayToAdd){
   for (let i = 0; i < 4; i++){
       let tempArray = arrayToAdd[i].filter(num => num > 0);
       while (tempArray.length < 4){
           tempArray.unshift(0);
       }
       for (let j = 3; j >= 1; j--){
           if (tempArray[j] === tempArray[j-1]){
               tempArray[j] = tempArray[j] + tempArray[j-1]
               tempArray.splice(j-1,1);
               tempArray.unshift(0)
           }
       }
       arrayToAdd[i] = tempArray;
   }
}

function rotateGrid(arrayToRotate){
    const n = arrayToRotate.length;
    const x = Math.floor(n/2);
    const y = n - 1;
    for (let i = 0; i < x; i++){
        for (let j = i;  j < y-i; j++){
            let k = arrayToRotate[i][j];
            arrayToRotate[i][j] = arrayToRotate[y - j][i];
            arrayToRotate[y - j][i] = arrayToRotate[y - i][y - j];
            arrayToRotate[y - i][y - j] = arrayToRotate[j][y - i];
            arrayToRotate[j][y - i] = k;
        }
    }
}

document.querySelector(".new-game-btn").addEventListener("click", initialize);

document.addEventListener("keydown", move);

function move(e){
    let flatGame = [...gameBoard[0], ...gameBoard[1], ...gameBoard[2], ...gameBoard[3]];
    if (e.code === "ArrowUp"){
        rotateGrid(gameBoard);
        addRightwards(gameBoard);
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        validateMove(flatGame);
    } else if (e.code === "ArrowDown"){
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        addRightwards(gameBoard);
        rotateGrid(gameBoard);
        validateMove(flatGame);
    } else if (e.code === "ArrowLeft"){
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        addRightwards(gameBoard);
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        validateMove(flatGame);
    } else if (e.code === "ArrowRight"){
        addRightwards(gameBoard);
        validateMove(flatGame);
    } else {
        console.log("Invalid key");
    }
    updateTiles();
    gameOver();
}

function validateMove(gamePreMove){
    let flatGamePostMove = [...gameBoard[0], ...gameBoard[1], ...gameBoard[2], ...gameBoard[3]];
        for (let i = 0; i < 16; i++){
            if (gamePreMove[i] !== flatGamePostMove[i]){
                randomSpawnNumber();
                break;
            } else if (i === 15 && gamePreMove[i] === flatGamePostMove[i]){
                console.log("Move is invalid");
            }
        }
}

function gameOver(){
    let tempGameBoard1 = [], tempGameBoard2 = [], tempGameBoard3 = [], tempGameBoard4 = [];
    for (let i = 0; i < gameBoard.length; i++){
        tempGameBoard1[i] = gameBoard[i].slice();
        tempGameBoard2[i] = gameBoard[i].slice();
        tempGameBoard3[i] = gameBoard[i].slice();
        tempGameBoard4[i] = gameBoard[i].slice();
    }
    // checks up
    rotateGrid(tempGameBoard1);
    addRightwards(tempGameBoard1);
    rotateGrid(tempGameBoard1);
    rotateGrid(tempGameBoard1);
    rotateGrid(tempGameBoard1);
    // checks right
    addRightwards(tempGameBoard2);
    // checks downwards
    rotateGrid(tempGameBoard3);
    rotateGrid(tempGameBoard3);
    rotateGrid(tempGameBoard3);
    addRightwards(tempGameBoard3);
    rotateGrid(tempGameBoard3);
    // checks left
    rotateGrid(tempGameBoard4);
    rotateGrid(tempGameBoard4);
    addRightwards(tempGameBoard4);
    rotateGrid(tempGameBoard4);
    rotateGrid(tempGameBoard4);

    let flattenedGame = [...gameBoard[0], ...gameBoard[1], ...gameBoard[2], ...gameBoard[3]];
    let flattenedTemp1 = [...tempGameBoard1[0], ...tempGameBoard1[1], ...tempGameBoard1[2], ...tempGameBoard1[3]];
    let flattenedTemp2 = [...tempGameBoard2[0], ...tempGameBoard2[1], ...tempGameBoard2[2], ...tempGameBoard2[3]];
    let flattenedTemp3 = [...tempGameBoard3[0], ...tempGameBoard3[1], ...tempGameBoard3[2], ...tempGameBoard3[3]];
    let flattenedTemp4 = [...tempGameBoard4[0], ...tempGameBoard4[1], ...tempGameBoard4[2], ...tempGameBoard4[3]];

    for (let i = 0; i < 16; i++){
        if (flattenedGame[i] !== flattenedTemp1[i] || flattenedGame[i] !== flattenedTemp2[i] || flattenedGame[i] !== flattenedTemp3[i] || flattenedGame[i] !== flattenedTemp4[i]){
            console.log("GAMES NOT OVER");
            break;
        } else if (i === 15  && (flattenedGame[i] === flattenedTemp1[i] || flattenedGame[i] === flattenedTemp2[i] || flattenedGame[i] === flattenedTemp3[i] || flattenedGame[i] === flattenedTemp4[i])){
            console.log("GAMES OVER!! :(");
            window.confirm('Game over, press the "New Game" button to start a new game.');
        }
    }
}

function updateTiles(){
    let temp = [...gameBoard[0], ...gameBoard[1], ...gameBoard[2], ...gameBoard[3]];
    for (let i = 0; i < temp.length; i++){
        let divElement = document.getElementById(`grid-item${i}`);
        divElement.innerHTML = temp[i];
        if (temp[i] === 0){
            divElement.classList.add("tile-0")
            divElement.classList.remove("tile-2")
            divElement.classList.remove("tile-4")
            divElement.classList.remove("tile-8")
            divElement.classList.remove("tile-16")
            divElement.classList.remove("tile-32")
            divElement.classList.remove("tile-64")
            divElement.classList.remove("tile-128")
            divElement.classList.remove("tile-256")
            divElement.classList.remove("tile-512")
            divElement.classList.remove("tile-1024")
            divElement.classList.remove("tile-2048")
        } else if (temp[i] === 2){
            divElement.classList.remove("tile-0")
            divElement.classList.add("tile-2")
            divElement.classList.remove("tile-4")
            divElement.classList.remove("tile-8")
            divElement.classList.remove("tile-16")
            divElement.classList.remove("tile-32")
            divElement.classList.remove("tile-64")
            divElement.classList.remove("tile-128")
            divElement.classList.remove("tile-256")
            divElement.classList.remove("tile-512")
            divElement.classList.remove("tile-1024")
            divElement.classList.remove("tile-2048")
        } else if (temp[i] === 4){
            divElement.classList.remove("tile-0")
            divElement.classList.remove("tile-2")
            divElement.classList.add("tile-4")
            divElement.classList.remove("tile-8")
            divElement.classList.remove("tile-16")
            divElement.classList.remove("tile-32")
            divElement.classList.remove("tile-64")
            divElement.classList.remove("tile-128")
            divElement.classList.remove("tile-256")
            divElement.classList.remove("tile-512")
            divElement.classList.remove("tile-1024")
            divElement.classList.remove("tile-2048")
        } else if (temp[i] === 8){
            divElement.classList.remove("tile-0")
            divElement.classList.remove("tile-2")
            divElement.classList.remove("tile-4")
            divElement.classList.add("tile-8")
            divElement.classList.remove("tile-16")
            divElement.classList.remove("tile-32")
            divElement.classList.remove("tile-64")
            divElement.classList.remove("tile-128")
            divElement.classList.remove("tile-256")
            divElement.classList.remove("tile-512")
            divElement.classList.remove("tile-1024")
            divElement.classList.remove("tile-2048")
        } else if (temp[i] === 16){
            divElement.classList.remove("tile-0")
            divElement.classList.remove("tile-2")
            divElement.classList.remove("tile-4")
            divElement.classList.remove("tile-8")
            divElement.classList.add("tile-16")
            divElement.classList.remove("tile-32")
            divElement.classList.remove("tile-64")
            divElement.classList.remove("tile-128")
            divElement.classList.remove("tile-256")
            divElement.classList.remove("tile-512")
            divElement.classList.remove("tile-1024")
            divElement.classList.remove("tile-2048")
        } else if (temp[i] === 32){
            divElement.classList.remove("tile-0")
            divElement.classList.remove("tile-2")
            divElement.classList.remove("tile-4")
            divElement.classList.remove("tile-8")
            divElement.classList.remove("tile-16")
            divElement.classList.add("tile-32")
            divElement.classList.remove("tile-64")
            divElement.classList.remove("tile-128")
            divElement.classList.remove("tile-256")
            divElement.classList.remove("tile-512")
            divElement.classList.remove("tile-1024")
            divElement.classList.remove("tile-2048")
        } else if (temp[i] === 64){
            divElement.classList.remove("tile-0")
            divElement.classList.remove("tile-2")
            divElement.classList.remove("tile-4")
            divElement.classList.remove("tile-8")
            divElement.classList.remove("tile-16")
            divElement.classList.remove("tile-32")
            divElement.classList.add("tile-64")
            divElement.classList.remove("tile-128")
            divElement.classList.remove("tile-256")
            divElement.classList.remove("tile-512")
            divElement.classList.remove("tile-1024")
            divElement.classList.remove("tile-2048")
        } else if (temp[i] === 128){
            divElement.classList.remove("tile-0")
            divElement.classList.remove("tile-2")
            divElement.classList.remove("tile-4")
            divElement.classList.remove("tile-8")
            divElement.classList.remove("tile-16")
            divElement.classList.remove("tile-32")
            divElement.classList.remove("tile-64")
            divElement.classList.add("tile-128")
            divElement.classList.remove("tile-256")
            divElement.classList.remove("tile-512")
            divElement.classList.remove("tile-1024")
            divElement.classList.remove("tile-2048")
        } else if (temp[i] === 256){
            divElement.classList.remove("tile-0")
            divElement.classList.remove("tile-2")
            divElement.classList.remove("tile-4")
            divElement.classList.remove("tile-8")
            divElement.classList.remove("tile-16")
            divElement.classList.remove("tile-32")
            divElement.classList.remove("tile-64")
            divElement.classList.remove("tile-128")
            divElement.classList.add("tile-256")
            divElement.classList.remove("tile-512")
            divElement.classList.remove("tile-1024")
            divElement.classList.remove("tile-2048")
        } else if (temp[i] === 512){
            divElement.classList.remove("tile-0")
            divElement.classList.remove("tile-2")
            divElement.classList.remove("tile-4")
            divElement.classList.remove("tile-8")
            divElement.classList.remove("tile-16")
            divElement.classList.remove("tile-32")
            divElement.classList.remove("tile-64")
            divElement.classList.remove("tile-128")
            divElement.classList.remove("tile-256")
            divElement.classList.add("tile-512")
            divElement.classList.remove("tile-1024")
            divElement.classList.remove("tile-2048")
        } else if (temp[i] === 1024){
            divElement.classList.remove("tile-0")
            divElement.classList.remove("tile-2")
            divElement.classList.remove("tile-4")
            divElement.classList.remove("tile-8")
            divElement.classList.remove("tile-16")
            divElement.classList.remove("tile-32")
            divElement.classList.remove("tile-64")
            divElement.classList.remove("tile-128")
            divElement.classList.remove("tile-256")
            divElement.classList.remove("tile-512")
            divElement.classList.add("tile-1024")
            divElement.classList.remove("tile-2048")
        } else if (temp[i] === 2048){
            divElement.classList.remove("tile-0")
            divElement.classList.remove("tile-2")
            divElement.classList.remove("tile-4")
            divElement.classList.remove("tile-8")
            divElement.classList.remove("tile-16")
            divElement.classList.remove("tile-32")
            divElement.classList.remove("tile-64")
            divElement.classList.remove("tile-128")
            divElement.classList.remove("tile-256")
            divElement.classList.remove("tile-512")
            divElement.classList.remove("tile-1024")
            divElement.classList.add("tile-2048")
        }
    }
}
