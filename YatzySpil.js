/* GUI-logikken (interface). Håndterer brugerinteraktion og visning:

Lytter til klik på terninger, knapper og score-felter
Opdaterer hvad brugeren ser (farver, tal, status)
Holder styr på valgte scores og brugte felter
Kommunikerer med YatzyDice.js for at få terningværdier og point-beregning*/

// 5 terninger 
let dice = [
    { value: 0, isHeld: false },
    { value: 0, isHeld: false },
    { value: 0, isHeld: false },
    { value: 0, isHeld: false },
    { value: 0, isHeld: false }
]; 

let throwCount = 0;  // Antal slag de 5 terningerne har tilsammen (max 3)


let grandTotal = 0;

/* function calculateScores() beregner alle mulige point-kombinationer baseret på de nuværende terningværdier og opdaterer pointtavlen med disse værdier. 
Den skal kaldes hver gang terningerne kastes eller ændres, så pointtavlen altid viser de korrekte muligheder for spilleren.*/
function calculateScores() {
    
   
}
 




/* function updatePrevious() opdaterer billederne (dice value 1 = die1.png) når man kaster med terningerne og viser de nye værdier. 
Den skal kaldes efter hver kast for at sikre, at spilleren altid ser de aktuelle terningværdier på skærmen*/
function updatePrevious() {
    for (let i = 0; i < dice.length; i++) {
        let dieImage = document.getElementById("die" + i);
        dieImage.src = "Assets/die" + (dice[i].value) + ".png";
    }
}


/* function roll() til at kaste med terninger og opdatere terningværdierne, samt opdatere pointtavlen og tekstfelterne. 
Den skal kaldes, når spilleren klikker på "Roll" knappen, og den skal håndtere logikken for at kaste terningerne, 
opdatere deres værdier og derefter opdatere både pointtavlen og de viste terningværdier.*/
function roll() {  
    if (throwCount >= 3) {
        return;
    }
    
    // Opret holds array baseret på hvilke terninger der er fastholdt
    let holds = dice.map(d => d.isHeld);
    
    // Kast terningerne - kun dem der ikke er holdt
    for (let i = 0; i < dice.length; i++) {
        if (!dice[i].isHeld) {
            dice[i].value = Math.floor(Math.random() * 6) + 1;
        }
    }
    
    throwCount++;
    updatePrevious();
    calculateScores();
}








/* function submitScore() til at submitte score og opdatere pointtavlen når spilleren vælger et score-felt. 
Den skal kaldes, når spilleren klikker på et score-felt for at gemme deres score for den runde, opdatere pointtavlen og forberede spillet 
til næste runde.*/
function submitScore() {

}





// fucntion resetTurn() til at nulstille kast og terninger.
function resetTurn() {
    throwCount = 0;
}






/* function checkBonus() tjekker om man har fået bonus og opdaterer pointtavlen check if min. 63 point er nået i første del af pointtavlen 
og opdaterer bonus-feltet hvis det er tilfældet. 
Tjek også om det allerede er opnået og opdater bonus-feltet hvis det er tilfældet */
function checkBonus() {
    let upperSectionTotal = 0;
}

/**
 * Nulstiller kast-tælleren
 */
function resetThrowCount() {
    throwCount = 0;
}



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


//Tilknytning af funktionen "roll" til knappen sker til sidst for at sikre, 
// at alle funktioner og variabler er defineret, før knappen kan interagere med dem.
const rollButton = document.getElementById('rollButton');
rollButton.addEventListener('click', roll);
document.addEventListener("DOMContentLoaded", setupDiceClick);