const game = document.getElementById('game');
const paddle1 = document.getElementById('paddle1');
const paddle2 = document.getElementById('paddle2');
const ball = document.getElementById('ball');
const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');

let ballSpeedX = 4;
let ballSpeedY = 4;
let paddle1Y = 200;
let paddle2Y = 200;
let paddleSpeed = 7;
let player1Score = 0;
let player2Score = 0;
let gameOver = false;

// Controlando o paddle do jogador 1
document.addEventListener('keydown', function(event) {
    if (event.key === 'w' && paddle1Y > 0) {
        paddle1Y -= paddleSpeed;
    } else if (event.key === 's' && paddle1Y < game.clientHeight - paddle1.clientHeight) {
        paddle1Y += paddleSpeed;
    }
    paddle1.style.top = paddle1Y + 'px';
});

// Movendo o paddle do jogador 2 automaticamente
function movePaddle2() {
    if (paddle2Y + paddle2.clientHeight / 2 < ball.offsetTop + ball.clientHeight / 2) {
        paddle2Y += paddleSpeed;
    } else if (paddle2Y + paddle2.clientHeight / 2 > ball.offsetTop + ball.clientHeight / 2) {
        paddle2Y -= paddleSpeed;
    }
    paddle2.style.top = paddle2Y + 'px';
}

// Movendo a bola
function moveBall() {
    let ballX = ball.offsetLeft;
    let ballY = ball.offsetTop;

    // Colisão com as paredes superior e inferior
    if (ballY <= 0 || ballY >= game.clientHeight - ball.clientHeight) {
        ballSpeedY = -ballSpeedY;
    }

    // Colisão com o paddle 1
    if (ballX <= paddle1.offsetLeft + paddle1.clientWidth && 
        ballY + ball.clientHeight > paddle1Y && 
        ballY < paddle1Y + paddle1.clientHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Colisão com o paddle 2
    if (ballX + ball.clientWidth >= paddle2.offsetLeft && 
        ballY + ball.clientHeight > paddle2Y && 
        ballY < paddle2Y + paddle2.clientHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Pontuação e reinício da bola
    if (ballX <= 0) {
        player2Score++;
        updateScore();
        resetBall();
    } else if (ballX >= game.clientWidth - ball.clientWidth) {
        player1Score++;
        updateScore();
        resetBall();
    }

    ball.style.left = ballX + ballSpeedX + 'px';
    ball.style.top = ballY + ballSpeedY + 'px';
}

function updateScore() {
    player1ScoreElement.textContent = player1Score;
    player2ScoreElement.textContent = player2Score;
}

function resetBall() {
    ball.style.left = '50%';
    ball.style.top = '50%';
    ballSpeedX = -ballSpeedX; // Inverte a direção da bola
}

function gameLoop() {
    if (!gameOver) {
        moveBall();
        movePaddle2();
        requestAnimationFrame(gameLoop);
    }
}

// Iniciar o loop do jogo
gameLoop();
