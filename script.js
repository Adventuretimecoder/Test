const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [
    {x: 10, y: 10},
    {x: 10, y: 11},
    {x: 10, y: 12}
];
let direction = 'RIGHT';
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

// this will allow you to control the snake
document.addEventListener('keydown', directionControl);

function directionControl(event) {
    if (event.keyCode == 37 && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.keyCode == 38 && direction !== 'DOWN') direction = 'UP';
    else if (event.keyCode == 39 && direction !== 'LEFT') direction = 'RIGHT';
    else if (event.keyCode == 40 && direction !== 'UP') direction = 'DOWN';
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move the snake
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    <div class="controls">
    <button onclick="changeDirection('up')">Up</button>
    <button onclick="changeDirection('down')">Down</button>
    <button onclick="changeDirection('left')">Left</button>
    <button onclick="changeDirection('right')">Right</button>
</div>
    function changeDirection(newDirection) {
    
    }
    

    // Check if snake eats food
    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        // Remove the last part of snake
        snake.pop();
    }

    // Add new head
    const newHead = { x: snakeX, y: snakeY };

    // Game over conditions
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over!');
    }

    snake.unshift(newHead);
}

// Check collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Call draw function every 100 ms
let game = setInterval(gameLoop, 200);

        
