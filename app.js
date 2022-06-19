ScrollReveal().reveal('h1', { delay: 300 });
ScrollReveal().reveal('.displaySelection', { delay: 400 });
ScrollReveal().reveal('.userSelections', { delay: 500 });

const displaySelection = document.querySelector(".displaySelection");
const botSeletionDisplay = displaySelection.children[0].children
const playerSeletionDisplay = displaySelection.children[1].children

const playerSelection = document.querySelectorAll(".userSelection");
const stats = document.querySelector(".stats");
const winnerDisplay = document.getElementById("winner")

let playerWins = 0;
let botWins = 0;
let ties = 0;
let currentRound = 0;
let totalRound = 5;

const gameWinner = () => {
    if (playerWins == botWins){
        return "It was a Draw!"
    }
    else if (playerWins > botWins){
        return "Player won the game!"
    }
    else if (playerWins < botWins){
        return "Bot won the game!"
    }
}

playerSelection.forEach(item => {
    console.log(currentRound)
    item.addEventListener("click", (e) => {
        if (currentRound < totalRound) {
            resetDisplay()
            let playerChoice = e.target.parentElement.dataset.id;
            currentRound++
            playRound(playerChoice)
            playerDisplay(playerChoice)
            updateStats();
        }
        else {
            winnerDisplay.innerText = gameWinner()
            const ask = prompt("Game Over! Would you like to play again? (yes/y)").toLowerCase()
            if (ask == "yes" || ask == "y"){
                playerWins = 0;
                botWins = 0;
                ties = 0;
                currentRound = 0;
                updateStats();
                resetDisplay();
                winnerDisplay.innerText = "";
            }
            else {

            }
        }
    })
})

const playerDisplay = (playerChoice) => {
    
    if (playerChoice == "rock"){
        playerSeletionDisplay[0].classList.add("active")
    }
    else if (playerChoice == "paper"){
        playerSeletionDisplay[1].classList.add("active")
    }
    else if (playerChoice == "scissors"){
        playerSeletionDisplay[2].classList.add("active")
    }
}

const botDisplay = (botPick) => {
    if (botPick == "rock"){
        botSeletionDisplay[0].classList.add("active")
    }
    else if (botPick == "paper"){
        botSeletionDisplay[1].classList.add("active")
    }
    else if (botPick == "scissors"){
        botSeletionDisplay[2].classList.add("active")
    }
}

const resetDisplay = () => {
    playerSeletionDisplay[0].classList.remove("active")
    playerSeletionDisplay[1].classList.remove("active")
    playerSeletionDisplay[2].classList.remove("active")

    botSeletionDisplay[0].classList.remove("active")
    botSeletionDisplay[1].classList.remove("active")
    botSeletionDisplay[2].classList.remove("active")
}

const resetBtn = stats.children[3];

resetBtn.addEventListener("click", (e) => {
    let ask = prompt('Are you sure?').toLowerCase();
    if (ask == "yes" || ask == "y") {
        playerWins = 0;
        botWins = 0;
        ties = 0;
        updateStats();
        resetDisplay()
    }
})

const botPlay = () => {
    const possiblePlays = ["scissors", "rock", "paper", "scissors", "paper", "rock", "paper", "rock", "scissors"];
    const playPicker = Math.floor(Math.random() * possiblePlays.length);
    const play = possiblePlays[playPicker];
    resetDisplay()
    botDisplay(play)
    return play;
}

const playRound = (playerChoice) => {
    let botChoice = botPlay();
    console.log(playerChoice, botChoice)

    if (playerChoice == botChoice) {
        ties++;
        return "Tie";
    }

    else if (botChoice == "rock" && playerChoice == "paper" ||
    botChoice == "paper" && playerChoice == "scissors" || botChoice == "scissors" && playerChoice == "rock") {
        playerWins++;
        return "Player wins";
    }

    else if (botChoice == "rock" && playerChoice == "scissors" ||
        botChoice == "paper" && playerChoice == "rock" ||
        botChoice == "scissors" && playerChoice == "paper") {
            botWins++;
            return "Bot wins";
        }
}

const updateStats = () => {
    stats.children[0].children[0].innerText = playerWins
    stats.children[1].children[0].innerText = botWins
    stats.children[2].children[0].innerText = ties
}

console.log(playerSelection)
console.log(botSeletionDisplay, playerSeletionDisplay)