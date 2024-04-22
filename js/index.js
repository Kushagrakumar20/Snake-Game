// Game constant and variables

let inputDir = {x:0, y:0};
const foodsound = new Audio('khate_time.mp3');
const gameoversound = new Audio('gameover.wav');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakearr = [
    {x: 13, y: 15}
];
food = {x: 6, y: 7};
// Game function
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameengine();
}

function isCollide(snake){
    // if you bump into yourself
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            gameoversound.play();
            scoreBox.innerHTML = `Score: 0`;
            return true;
        }
    }
    // if you bump into wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        gameoversound.play();
        scoreBox.innerHTML = `Score: 0`;
        return true;
    }
    return false; 
}

function gameengine(){
    //Part 1 = updating the snake array & food
    if(isCollide(snakearr)){        
        // musicsound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again!!");
        snakearr = [{x: 13, y: 15}];
        // musicsound.play();
        score = 0;
    }

    //If you have eaten the food, increment the score and regenrate the food
    if(snakearr[0].y === food.y && snakearr[0].x === food.x){
        foodsound.play();
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        snakearr.unshift({x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a)* Math.random())};
    }
    
    //Moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--){
        snakearr[i+1] = {...snakearr[i]}; 
    }
        
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;
    // Part 2 = display the snake and food
    //display the snake
    board.innerHTML = "";
    snakearr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // snakeElement.classList.add('snake');
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });

    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


window.requestAnimationFrame(main);

window.addEventListener('keydown', e =>{
    inputDir = {x:0, y:1}; // start the game
    // movesound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
                                
    }
});




