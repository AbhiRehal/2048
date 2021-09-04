'use strict';

let gameBoard = [[0, 1, 2, 3],
                [4, 5, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]];

let startingPosition = Math.trunc(Math.random() * 15) + 1;
let randomNumberX = 0, randomNumberY = 0;

document.getElementsByClassName("box1").move = "black"

function randomSpawnNumber(){
    randomNumberX = Math.trunc(Math.random() * 4);
    randomNumberY = Math.trunc(Math.random() * 4);
    gameBoard[randomNumberX][randomNumberY] = `X`;
}

function addRightwards(arrayToAdd){
    for (let i = 0; i < 4; i++){
        for (let j = 3; j >= 0; j--){
            let rightNumber, leftNumber;
            rightNumber = arrayToAdd[i][j];
            leftNumber = arrayToAdd[i][j-1];
        }
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


document.addEventListener("keydown", move);

function move(e){
    if (e.code === "ArrowUp"){
        rotateGrid(gameBoard);
        // add
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
    } else if (e.code === "ArrowDown"){
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        // add
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
    } else if (e.code === "ArrowLeft"){
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        // add
        rotateGrid(gameBoard);
    } else {
        console.log("Invalid key");
    }
    console.log(gameBoard);
}

document.querySelector(".grid").addEventListener("click", function(){
    console.log("Clicked the grid bruh");
});
