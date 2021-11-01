'use strict';

document.querySelector(".new-game-btn").addEventListener("click", initialize);

document.addEventListener("keydown", move);

let randomNumberX, randomNumberY, gameBoard;

initialize();

// Initializes the game
function initialize(){
    randomNumberX = 0, randomNumberY = 0;
    gameBoard = [   [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]    ];

    randomSpawnNumber();
    randomSpawnNumber();
    // Sets the CSS elements of each tile
    updateTiles();
}

// Function spawns a random number in the grid
function randomSpawnNumber(){
    // Turns 4x4 grid into 1x16 array
    let temp = [...gameBoard[0], ...gameBoard[1], ...gameBoard[2], ...gameBoard[3]]
    let flag = 1;
    // Check that there is an empty element in the array
    // Breaks if you find a zero, if you get to the end with no zero array is full
    for (let i = 0; i < temp.length; i++){
        if (temp[i] === 0){
            break;
        } else if (temp[15] !== 0 && i === 15){
            flag = 0;
        }
    }
    // If you get to here there is an open place to insert a new number
    if (flag){
        randomNumberX = Math.trunc(Math.random() * 4);
        randomNumberY = Math.trunc(Math.random() * 4);
        // Find empty space to put new number in
        while (gameBoard[randomNumberX][randomNumberY] !== 0){
            randomNumberX = Math.trunc(Math.random() * 4);
            randomNumberY = Math.trunc(Math.random() * 4);
        }
        // Spawns a "4 tile" 10% of the time else it spawns a "2 tile"
        let spawn4 = Math.random();
        if (spawn4 < 0.1){
            gameBoard[randomNumberX][randomNumberY] = 4;
        } else {
            gameBoard[randomNumberX][randomNumberY] = 2;
        }
    }
}

// Function adds the array to the right in a destructive manner
function addRightwards(arrayToAdd){
   for (let i = 0; i < 4; i++){
       // Creates a 1x4 array which only contains non-zero elements
       // Returned array can be < 4 long
       let tempArray = arrayToAdd[i].filter(num => num > 0);
       // Prepends zeros to the 1x4 array to maintain the 1x4 size
       while (tempArray.length < 4){
           tempArray.unshift(0);
       }
       // Adds from the RHS side
       for (let j = 3; j >= 1; j--){
           if (tempArray[j] === tempArray[j-1]){
               // Sets the RHS element to 2x the original value
               tempArray[j] = tempArray[j] + tempArray[j-1]
               // Removes the LHS value and prepends a zero to maintain 1x4 size
               tempArray.splice(j-1,1);
               tempArray.unshift(0)
           }
       }
       arrayToAdd[i] = tempArray;
   }
}

// Each function call rotates the input array by 90 degrees clockwise
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

// Based on the input move, the array is rotated and then added to the right and then returned
// to the original orientation
function move(e){
    // Turns 4x4 grid into 1x16 array
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
    // Checks that the game is over
    gameOver();
}

// Validates that a move is allowed and spawns a number if so
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

// Checking if the game is over
function gameOver(){
    let tempGameBoard1 = [], tempGameBoard2 = [], tempGameBoard3 = [], tempGameBoard4 = [];
    // Creates 4 game boards, 1 for each direction
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

    // Checks that all the gameboards are identical, if the gameboards are NOT identical
    // the game is NOT over
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

// Updates the CSS elements of each tile by assigning the correct class name
function updateTiles(){
    let temp = [...gameBoard[0], ...gameBoard[1], ...gameBoard[2], ...gameBoard[3]];
    for (let i = 0; i < temp.length; i++){
        // Grabs the i'th tile in the HTML
        let divElement = document.getElementById(`grid-item${i}`);
        // Sets the text of the HTML to the value in the gameboard
        divElement.innerHTML = temp[i];
        if (temp[i] === 0){
            document.getElementById(`grid-item${i}`).classList.remove(document.getElementById(`grid-item${i}`).classList.item(0));
            document.getElementById(`grid-item${i}`).classList.add("tile-0");
        } else if (temp[i] === 2){
            document.getElementById(`grid-item${i}`).classList.remove(document.getElementById(`grid-item${i}`).classList.item(0));
            document.getElementById(`grid-item${i}`).classList.add("tile-2");
        } else if (temp[i] === 4){
            document.getElementById(`grid-item${i}`).classList.remove(document.getElementById(`grid-item${i}`).classList.item(0));
            document.getElementById(`grid-item${i}`).classList.add("tile-4");
        } else if (temp[i] === 8){
            document.getElementById(`grid-item${i}`).classList.remove(document.getElementById(`grid-item${i}`).classList.item(0));
            document.getElementById(`grid-item${i}`).classList.add("tile-8");
        } else if (temp[i] === 16){
            document.getElementById(`grid-item${i}`).classList.remove(document.getElementById(`grid-item${i}`).classList.item(0));
            document.getElementById(`grid-item${i}`).classList.add("tile-16");
        } else if (temp[i] === 32){
            document.getElementById(`grid-item${i}`).classList.remove(document.getElementById(`grid-item${i}`).classList.item(0));
            document.getElementById(`grid-item${i}`).classList.add("tile-32");
        } else if (temp[i] === 64){
            document.getElementById(`grid-item${i}`).classList.remove(document.getElementById(`grid-item${i}`).classList.item(0));
            document.getElementById(`grid-item${i}`).classList.add("tile-64");
        } else if (temp[i] === 128){
            document.getElementById(`grid-item${i}`).classList.remove(document.getElementById(`grid-item${i}`).classList.item(0));
            document.getElementById(`grid-item${i}`).classList.add("tile-128");
        } else if (temp[i] === 256){
            document.getElementById(`grid-item${i}`).classList.remove(document.getElementById(`grid-item${i}`).classList.item(0));
            document.getElementById(`grid-item${i}`).classList.add("tile-256");
        } else if (temp[i] === 512){
            document.getElementById(`grid-item${i}`).classList.remove(document.getElementById(`grid-item${i}`).classList.item(0));
            document.getElementById(`grid-item${i}`).classList.add("tile-512");
        } else if (temp[i] === 1024){
            document.getElementById(`grid-item${i}`).classList.remove(document.getElementById(`grid-item${i}`).classList.item(0));
            document.getElementById(`grid-item${i}`).classList.add("tile-1024");
        } else if (temp[i] === 2048){
            document.getElementById(`grid-item${i}`).classList.remove(document.getElementById(`grid-item${i}`).classList.item(0));
            document.getElementById(`grid-item${i}`).classList.add("tile-2048");
        }
    }
}
