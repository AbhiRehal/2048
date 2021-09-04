'use strict';

document.getElementsByClassName("box1").move = "black"
let game = document.getElementsByClassName("grid");
let randomNumberX = 0, randomNumberY = 0;

let gameBoard = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];

randomSpawnNumber()
randomSpawnNumber()
console.log(gameBoard);

function randomSpawnNumber(){
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


document.addEventListener("keydown", move);

function move(e){
    if (e.code === "ArrowUp"){
        rotateGrid(gameBoard);
        addRightwards(gameBoard);
        console.log("Gameboard is");
        console.log(gameBoard);
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        randomSpawnNumber();
    } else if (e.code === "ArrowDown"){
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        addRightwards(gameBoard);
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        randomSpawnNumber();
    } else if (e.code === "ArrowLeft"){
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        addRightwards(gameBoard);
        rotateGrid(gameBoard);
        randomSpawnNumber();
    } else if (e.code === "ArrowRight"){
        addRightwards(gameBoard);
        randomSpawnNumber();
    } else {
        console.log("Invalid key");
    }
    console.log(gameBoard);
}

document.querySelector(".grid-container").addEventListener("click", function(){
    console.log("Clicked the grid bruh");
});
