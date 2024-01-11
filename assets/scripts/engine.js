const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        angry: document.querySelector(".angry"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },

    value: {
        timerId: null,
        gameVelocity: 680,
        hitPosition: 0,
        result: 0,
        currentTime: 30,
        clickCount: 0,
    },

    action: {
        countDownTimerId: setInterval(countDown, 1000),
    },
}

function playSound () {
    let audio = new Audio("./assets/sounds/damage.mp3");
    audio.volume = 0.2;
    audio.play();
}

function countDown () {
    if(state.value.currentTime <= 0){
        alert("Game Over! Seu resultado foi " + state.value.result);
        clearInterval(state.value.timerId);
        clearInterval(state.value.countDownTimerId);
    } else {
        state.value.currentTime--;
        state.view.timeLeft.textContent = state.value.currentTime;
    }
}

function addListenerHitBox () {
    state.view.squares.forEach((square) => {

       square.addEventListener("mousedown", () => {
            if(square.id === state.value.hitPosition){
                state.value.result++;
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                state.value.clickCount++;
                
            } 

            if (state.value.clickCount === 3) {
                playSound();
                square.classList.add("angry");
                square.style.filter = 'saturate(200%) hue-rotate(360deg)';
                setTimeout(() => {
                    square.style.filter = 'none';
                }, 670)
                state.value.clickCount = 0;
            }
            
       });
    });
}

function randomSquare () {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");

    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.value.hitPosition = randomSquare.id;
}

function moveEnemy () {
    state.value.timerId = setInterval(randomSquare, state.value.gameVelocity);
}

function init () {
    moveEnemy();
    addListenerHitBox();
}

init();