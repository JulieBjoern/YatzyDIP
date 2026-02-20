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

let throwCount = 0; 
let grandTotal = 0;

/* function calculateScores() beregner alle mulige point-kombinationer baseret på de nuværende terningværdier og opdaterer pointtavlen med disse værdier. 
Den skal kaldes hver gang terningerne kastes eller ændres, så pointtavlen altid viser de korrekte muligheder for spilleren.*/
function calculateScores() {
    
    let values = getValues(); // Funktion fra YatzyDice.js  

    
 




/* function updatePrevious() opdaterer tekstfelterne når man kaster med terningerne og viser de nye værdier. 
Den skal kaldes efter hver kast for at sikre, at spilleren altid ser de aktuelle terningværdier på skærmen*/
function updatePrevious() {
    let values = getValues();
    for (let i = 0; i < values.length; i++) {





        


/* function roll() til at kaste med terninger og opdatere terningværdierne, samt opdatere pointtavlen og tekstfelterne. 
Den skal kaldes, når spilleren klikker på "Roll" knappen, og den skal håndtere logikken for at kaste terningerne, 
opdatere deres værdier og derefter opdatere både pointtavlen og de viste terningværdier.*/
function roll() {   







/* function submitScore() til at submitte score og opdatere pointtavlen når spilleren vælger et score-felt. 
Den skal kaldes, når spilleren klikker på et score-felt for at gemme deres score for den runde, opdatere pointtavlen og forberede spillet 
til næste runde.*/
function submitScore() {







// fucntion resetTurn() til at nulstille kast og terninger.
function resetTurn() {
    throwCount = 0;







/* function checkBonus() tjekker om man har fået bonus og opdaterer pointtavlen check if min. 63 point er nået i første del af pointtavlen 
og opdaterer bonus-feltet hvis det er tilfældet. 
Tjek også om det allerede er opnået og opdater bonus-feltet hvis det er tilfældet */
function checkBonus() {
    let upperSectionTotal = 0;

// 






