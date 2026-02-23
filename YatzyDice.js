/*Spil-logikken (hjerne)*/


function getResults() {
    let results = new Array(15);
    for (let i = 0; i <= 5; i++) {
        results[i] = sameValuePoints(i + 1);
    }
    results[6] = onePairPoints();
    results[7] = twoPairPoints();
    results[8] = threeSamePoints();
    results[9] = fourSamePoints();
    results[10] = fullHousePoints();
    results[11] = smallStraightPoints();
    results[12] = largeStraightPoints();
    results[13] = chancePoints();
    results[14] = yatzyPoints();

    return results;
}



/*bruges til at tælle hvor mange terninger der har hver værdi (1-6)*/ 
function frequency() {
    let freq = new Array(7).fill(0);
    for (let value of values) {
        freq[value]++;
    }
    return freq;
}

/*Returnerer point for 1-6 ens (for den værdi der giver flest point).
Returnerer 0, hvis der ikke er 2 terninger med samme værdi.*/
function sameValuePoints(value) {
    return value * frequency()[value];
}

/*eksempel: Hvis der er 2 terninger med værdien 3, så returneres 6 point (3*2).*/
function onePairPoints() {
    let highestNumbers = 0;
    let freq = frequency();

    for (let i = 1; i < 7; i++) {
        if (freq[i] >= 2) {
            highestNumbers = i * 2;
        }
    }
    return highestNumbers;
}

/*returnerer point for to par (for de 2 værdier der giver flest point)*/
function twoPairPoints() {
    let pairCount = 0;
    let result = 0;
    let freq = frequency();

    for (let i = 1; i < 7; i++) {
        if (freq[i] >= 2) {
            pairCount++;
            result += i * 2;
        }
    }

    // Skal først returnere noget når der er fundet 2 par og ikke kun 1
    if (pairCount >= 2) {
        return result;
    }

    return 0;
}


function threeSamePoints() {
    let highestNumbers = 0;
    let freq = frequency();

    for (let i = 1; i < 7; i++) {
        if (freq[i] >= 3) {
            highestNumbers = i * 3;
        }
    }
    return highestNumbers;
}


function fourSamePoints() {
    let highestNumbers = 0;
    let freq = frequency();

    for (let i = 1; i < 7; i++) {
        if (freq[i] >= 4) {
            highestNumbers = i * 4;
        }
    }
    return highestNumbers;
}

/*Returnerer point for fuldt hus. Returnerer 0, hvis der ikke er 3 terninger med samme værdi
 og 2 andre terninger med samme men forskellig værdi.
 */
function fullHousePoints() {
    let hasThreeSameEyes = false;
    let hasTwoSameEyes = false;
    let result = 0;
    let freq = frequency();

    for (let i = 1; i < 7; i++) {
        if (freq[i] === 3) {
            hasThreeSameEyes = true;
            result += i * 3;
        } else if (freq[i] === 2) {
            hasTwoSameEyes = true;
            result += i * 2;
        }
    }

    if (hasThreeSameEyes && hasTwoSameEyes) {
        return result;
    }

    return 0;
}

/* Returnerer point for lille straight. Returnerer 0, hvis terningerne ikke viser 1,2,3,4,5.
 */
function smallStraightPoints() {
    let freq = frequency();

    if (freq[1] === 1 && freq[2] === 1 && freq[3] === 1 && 
        freq[4] === 1 && freq[5] === 1) {
        return 15;
    }
    return 0;
}

/* Returnerer point for stor straight. Returnerer 0, hvis terningerne ikke viser 2,3,4,5,6. */
function largeStraightPoints() {
    let freq = frequency();

    if (freq[2] === 1 && freq[3] === 1 && freq[4] === 1 && 
        freq[5] === 1 && freq[6] === 1) {
        return 20;
    }
    return 0;
}


function chancePoints() {
    let sum = 0;

    for (let value of values) {
        sum += value;
    }
    return sum;
}

/* Returnerer point for yatzy (50 point). Returnerer 0, hvis der ikke er 5 terninger med samme værdi.*/
function yatzyPoints() {
    let freq = frequency();

    for (let i = 1; i < 7; i++) {
        if (freq[i] >= 5) {
            return 50;
        }
    }
    return 0;
}