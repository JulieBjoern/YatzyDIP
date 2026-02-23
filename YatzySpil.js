
// 5 terninger 
let dice = [
    { value: 0, isHeld: false },
    { value: 0, isHeld: false },
    { value: 0, isHeld: false },
    { value: 0, isHeld: false },
    { value: 0, isHeld: false }
];

let throwCount = 0;
let grandTotal = 0;

/* opdaterer pointtavlen med score baseret på aktuelle terningeværdier. dem er er disabled skal ikke opdateres*/
function calculateScores() {

    values = dice.map(d => d.value);
    let results = getResults();

    const scoreIds = ["ones", "twos", "threes", "fours", "fives", "sixes", "1pair", "2pair", "3sames", "4sames", "fullhouse", "small", "large", "chance", "yatzy"];

    for (let i = 0; i < results.length; i++) {
        let scoreElement = document.getElementById(scoreIds[i]);

        if (scoreElement && !scoreElement.disabled) {
            if (results[i] > 0) {
                scoreElement.value = results[i];
            }
            else {
                scoreElement.value = "";
            }
        }
    }

}


/* function updatePrevious() opdaterer billederne (dice value 1 = die1.png) når man kaster med terningerne og viser de nye værdier. 
Den skal kaldes efter hver kast for at sikre, at spilleren altid ser de aktuelle terningværdier på skærmen*/
function updatePrevious() {
    for (let i = 0; i < dice.length; i++) {
        let dieImage = document.getElementById("die" + i);
        dieImage.src = "Assets/die" + (dice[i].value) + ".png";
    }
}


/* kaster med terningerne + gør det muligt at "holde" på terningerne */
function roll() {
    if (throwCount >= 3) {
        return;
    }

    let holds = dice.map(d => d.isHeld);

    for (let i = 0; i < dice.length; i++) {
        if (!dice[i].isHeld) {
            dice[i].value = Math.floor(Math.random() * 6) + 1;
        }
    }

    throwCount++;
    document.getElementById("turnLabel").textContent = "Turn " + throwCount;
    updatePrevious();
    calculateScores();
}


/* function submitScore() skal opdatere pointtavlen med den valgte score og nulstille terningerne og kast-tælleren for at forberede til næste runde.
Den skal også opdatere den samlede score (grand total) og tjekke for bonus, hvis det er relevant. */
function submitScore(scoreId) {

    if (throwCount === 0) return;

    let scoreElement = document.getElementById(scoreId);

    // early return; hvis elementet ikke findes eller allerede er brugt (disabled)
    if (!scoreElement || scoreElement.disabled) return;


    scoreElement.disabled = true;
    scoreElement.style.backgroundColor = '#e0e0e0';

    // opdater øverste sum 
    const topScoreIds = ["ones", "twos", "threes", "fours", "fives", "sixes"];
    let topSum = 0;
    for (let id of topScoreIds) {
        let element = document.getElementById(id);
        if (element && element.value && element.disabled) {
            topSum += parseInt(element.value);
        }
    }
    document.getElementById("upperSectionSum").value = topSum;

    checkBonus();

    let grandTotal = 0;


    const allScoreIds = ["ones", "twos", "threes", "fours", "fives", "sixes",
        "1pair", "2pair", "3sames", "4sames", "house",
        "small", "large", "chance", "yatzy"];

    for (let id of allScoreIds) {
        let element = document.getElementById(id);
        if (element && element.value && element.disabled) {
            grandTotal += parseInt(element.value);
        }
    }

    let bonusElement = document.getElementById("bonus");
    if (bonusElement && bonusElement.value) {
        grandTotal += parseInt(bonusElement.value);
    }


    document.getElementById("grandtotal").value = grandTotal;

    // Nulstil for næste runde
    for (let i = 0; i < dice.length; i++) {
        dice[i].value = 1;
        dice[i].isHeld = false;
        document.getElementById("die" + i).classList.remove("held");
    }

    throwCount = 0;
    updatePrevious();
    document.getElementById("turnLabel").textContent = "Turn 1";
}




/*  tjekker om man har fået bonus og opdaterer pointtavlen check if min. 63 point er nået i første del af pointtavlen 
og opdaterer bonus-feltet hvis det er tilfældet. 
Tjek også om det allerede er opnået og opdater bonus-feltet hvis det er tilfældet */
function checkBonus() {

    const topScoreIds = ["ones", "twos", "threes", "fours", "fives", "sixes"];
    let topSum = 0;

    for (let id of topScoreIds) {
        let element = document.getElementById(id);
        if (element && element.value) {
            topSum += parseInt(element.value);
        }
    }

    let bonusElement = document.getElementById("bonus");
    if (topSum >= 63 && bonusElement.value === "") {
        bonusElement.value = 50;
    }
}


/* addEventListener til hver terning for at gøre det muligt at "holde" på dem ved at klikke på dem*/
function setupDiceClick() {
    for (let i = 0; i < 5; i++) {
        let dieElement = document.getElementById("die" + i);
        dieElement.dataset.index = i;
        dieElement.addEventListener("click", function (e) {
            if (throwCount === 0) return;

            const index = parseInt(e.target.dataset.index);
            dice[index].isHeld = !dice[index].isHeld;
            e.target.classList.toggle("held");
        });
    }
}


function setupScoreClick() {
    const scoreIds = ["ones", "twos", "threes", "fours", "fives", "sixes",
        "1pair", "2pair", "3sames", "4sames", "house",
        "small", "large", "chance", "yatzy"];

    for (let scoreId of scoreIds) {
        let element = document.getElementById(scoreId);
        if (element) {
            element.addEventListener('click', function () {
                submitScore(scoreId);
            });
        }
    }
}

/* dom skal loades før event listeners sættes op for at sikre at alle elementer er tilgængelige, 
når vi prøver at tilføje event listeners til dem.*/

document.addEventListener("DOMContentLoaded", function () {

    const rollButton = document.getElementById('rollButton');
    rollButton.addEventListener('click', roll);
    setupDiceClick();
    setupScoreClick();
});