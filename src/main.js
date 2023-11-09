let state = {
    view: {
        squares: document.querySelectorAll(".square"),
        hasRalph: document.querySelector(".hasRalph"),
        timer: document.querySelector("#timeLeft"),
        scorePoints: document.querySelector("#scorePoints"),
    },
    values: {
        ralphPosition: null,
        score: 0,
        timeLeft: 60,
    },
    actions:{
        timerId: null,
        movement: null,
    }
}

function moveRalph(){
    const newPosition = Math.floor(Math.random() * 9);
    
    state.view.squares.forEach((square) => {
        square.classList.remove("hasRalph");
        square.classList.remove("ralphHit");
    });
    state.view.squares[newPosition].classList.add("hasRalph");
    state.values.ralphPosition = newPosition;
}

function addSquareClickListener(){
    state.view.squares.forEach((square) => {
            square.addEventListener("mousedown", ()=>{
                if(state.values.ralphPosition !== null){
                    if(parseInt(square.id) === state.values.ralphPosition){
                        ++state.values.score;
                        state.view.squares[square.id].classList.add("ralphHit");
                        playSound("hit.m4a");
                    state.values.ralphPosition = null;
                    } else{
                        --state.values.score;
                    }
                    state.view.scorePoints.textContent = state.values.score;
                }
            })
    })
}

function countdown(){
    state.view.timer.textContent = --state.values.timeLeft;

    if(state.values.timeLeft <= 0){
        alert("Fim de jogo! Resultado final: " + state.values.score);
        gameOver();
    }
}

function playSound(fileName){
    let audio = new Audio(`./src/audio/${fileName}`)
    audio.volume = 0.05;
    audio.play();
}

function gameOver(){
    clearInterval(state.actions.movement);
    clearInterval(state.actions.timerId);
    state.view.scorePoints.textContent = state.values.score = 0;
    state.view.timer.textContent = state.values.timeLeft = 0;
    state.values.ralphPosition = null;
 }

function main(){
    state.actions.movement = setInterval(moveRalph, 700);
    state.actions.timerId = setInterval(countdown, 1000);
    addSquareClickListener();
}

main()