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

gameOver();
console.log(gameBoard);

updateTiles();

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


document.addEventListener("keydown", move);

function move(e){
    // gameOver();
    if (e.code === "ArrowUp"){
        rotateGrid(gameBoard);
        addRightwards(gameBoard);
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        randomSpawnNumber();
    } else if (e.code === "ArrowDown"){
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        addRightwards(gameBoard);
        rotateGrid(gameBoard);
        randomSpawnNumber();
    } else if (e.code === "ArrowLeft"){
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        addRightwards(gameBoard);
        rotateGrid(gameBoard);
        rotateGrid(gameBoard);
        randomSpawnNumber();
    } else if (e.code === "ArrowRight"){
        addRightwards(gameBoard);
        randomSpawnNumber();
    } else {
        console.log("Invalid key");
    }
    updateTiles();
    
}

document.querySelector(".grid-container").addEventListener("click", function(){
    console.log("Clicked the grid bruh");
});

function gameOver(){
    let temp1 = [...gameBoard];
    let temp2 = [...gameBoard];
    let temp3 = [...gameBoard];
    let temp4 = [...gameBoard];
    let temp5 = [...gameBoard];
    // checks up
    rotateGrid(temp2);
    addRightwards(temp2);
    rotateGrid(temp2);
    rotateGrid(temp2);
    rotateGrid(temp2);
    // checks down
    rotateGrid(temp3);
    rotateGrid(temp3);
    rotateGrid(temp3);
    addRightwards(temp3);
    rotateGrid(temp3);
    // checks left
    rotateGrid(temp4);
    rotateGrid(temp4);
    addRightwards(temp4);
    rotateGrid(temp4);
    rotateGrid(temp4);
    // checks right
    addRightwards(temp5);
    if (temp1 ===  temp2 && temp1 === temp3 && temp1 === temp4 && temp1 === temp5){
        console.log("GAME OVER");
    } else {
        console.log("GAME NOT OVER");
    }
}

function updateTiles(){
    let temp = [...gameBoard[0], ...gameBoard[1], ...gameBoard[2], ...gameBoard[3]];
    console.log(temp);
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
