const alleBuchstaben = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const alleWörter = ["lpha", "ravo", "harlie", "elta", "cho", "oxtrot", "olf", "otel", "ndia", "uliet", "ilo", "ima", "ike", "ovember", 
    "scar", "apa", "uebec", "omeo", "ierra", "ango", "niform", "ictor", "hiskey", "ray", "ankee", "ulu"];
var dreiZufälligeZahlen;
var ausgewählterIndex;
var streak = 0;
var höchsteStreak = 0;



window.onload = function(){
    dreiZufälligeZahlen = storageProxy.dreiZufälligeZahlen;
    ausgewählterIndex = storageProxy.ausgewählterIndex;
    streak = storageProxy.streak != null ? storageProxy.streak : 0;
    höchsteStreak = storageProxy.höchsteStreak != null ? storageProxy.höchsteStreak : 0;


    document.getElementById("button_1").textContent = alleWörter[dreiZufälligeZahlen[0]];
    document.getElementById("button_2").textContent = alleWörter[dreiZufälligeZahlen[1]];
    document.getElementById("button_3").textContent = alleWörter[dreiZufälligeZahlen[2]];

    document.getElementById("p_buchstabe").textContent = alleBuchstaben[ausgewählterIndex];


    document.getElementById("p_höchsteStreak").textContent = "Höchste Streak: " + höchsteStreak;

    document.getElementById("p_streak").textContent = "Streak: " + streak;
}



const storageProxy = new Proxy({}, {
    get(target, key){
        return JSON.parse(localStorage.getItem(key));
    },
    set(target, key, value){
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    }
})


//function shuffle
function shuffle(array){
    for(let i = array.length - 1; i > 0; i--){
        const random = Math.floor(Math.random() * (i + 1));

        [array[i], array[random]] = [array[random], array[i]];
    }
}


function randomNumber(amount, sourceArray) {
    if (!randomNumber.usedIndices) {
        randomNumber.usedIndices = new Set();
    }

    if (sourceArray.length < amount + randomNumber.usedIndices.size) {
        throw new Error("Nicht genug eindeutige Indizes im Array.");
    }

    const indices = new Set();

    while (indices.size < amount) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * sourceArray.length);
        } while (randomNumber.usedIndices.has(randomIndex)); // Prüft, ob der Index schon vorher genutzt wurde

        indices.add(randomIndex);
    }

    // Speichere die neuen Indizes für den nächsten Durchlauf
    randomNumber.usedIndices = new Set(indices);

    return Array.from(indices);
}


//hintergrund ändern
function changeBackground(color){
    document.body.style.background = color;
}



//drei buttons aktualisieren + neuer buchstabe
function neueWörter(){
    dreiZufälligeZahlen = randomNumber(3, alleWörter);
    storageProxy.dreiZufälligeZahlen = dreiZufälligeZahlen;
    console.log(dreiZufälligeZahlen); //test

    document.getElementById("button_1").textContent = alleWörter[dreiZufälligeZahlen[0]];
    document.getElementById("button_2").textContent = alleWörter[dreiZufälligeZahlen[1]];
    document.getElementById("button_3").textContent = alleWörter[dreiZufälligeZahlen[2]];

    ausgewählterIndex = dreiZufälligeZahlen[Math.floor(Math.random() * dreiZufälligeZahlen.length)];
    storageProxy.ausgewählterIndex = ausgewählterIndex;


    document.getElementById("p_buchstabe").textContent = alleBuchstaben[ausgewählterIndex];
}



//hintergrund ändern
function checkAnswer(trueOrFalse) {
    if(trueOrFalse === true) { //wenn richtig: neue runde und grüner hintergrund
        changeBackground("rgb(99, 180, 99)"); //grün
        setTimeout(() => {
            changeBackground("rgb(255, 255, 255)"); //normalfarbe hintergrund
          }, 500);

        streak++;
        storageProxy.streak = streak;
        if(streak > höchsteStreak){
            höchsteStreak = streak;
            storageProxy.höchsteStreak = höchsteStreak;
            document.getElementById("p_höchsteStreak").textContent = "Höchste Streak: " + höchsteStreak;
        }
        document.getElementById("p_streak").textContent = "Streak: " + streak;
    } else{ //wenn falsch: roter hintergrund
        changeBackground("rgb(196, 114, 114)"); //grün
        setTimeout(() => {
            changeBackground("rgb(255, 255, 255)"); //normalfarbe hintergrund
          }, 500);

        streak = 0;
        storageProxy.streak = streak;
        document.getElementById("p_streak").textContent = "Streak: " + streak;
    }
}


//auf richtige antwort prüfen
document.getElementById("button_1").addEventListener("click", (event) => {
    if(document.getElementById("button_1").textContent === alleWörter[ausgewählterIndex]){
        console.log("es ist 1");

        checkAnswer(true);
    }else{
        checkAnswer(false);
    }

    neueWörter();
});

//auf richtige antwort prüfen
document.getElementById("button_2").addEventListener("click", (event) => {
    if(document.getElementById("button_2").textContent === alleWörter[ausgewählterIndex]){
        console.log("es ist 2");

        checkAnswer(true);
    }else{
        checkAnswer(false);
    }

    neueWörter();
});

//auf richtige antwort prüfen
document.getElementById("button_3").addEventListener("click", (event) => {
    if(document.getElementById("button_3").textContent === alleWörter[ausgewählterIndex]){
        console.log("es ist 3");

        checkAnswer(true);
    }else{
        checkAnswer(false);
    }

    neueWörter();
});


