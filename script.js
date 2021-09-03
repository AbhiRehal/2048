'use strict';

let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let startingPosition = Math.trunc(Math.random() * 15) + 1;

document.getElementsByClassName("box1").move = "black"


document.addEventListener("keydown", move);

function move(e){
    if (e.code === "ArrowUp" || e.code === "ArrowDown" || e.code === "ArrowRight" || e.code === "ArrowLeft"){
        console.log(e.code);
    } else {
        console.log("Invalid key");
    }
}

document.querySelector(".grid").addEventListener("click", function(){
    console.log("Clicked the grid bruh");
});