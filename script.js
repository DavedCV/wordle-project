function makeSquares(){
    for (let row of rows) {
        let childs = [];
        for (let i = 0; i < 5; i++){
            let square = document.createElement("div");
            square.classList.add("square");
            row.appendChild(square);
            childs.push(square);
        }
        rowsChilds.push(childs);
        row.addEventListener("animationend", (e) => {
            e.target.classList.remove("invalid");
        })
    }

}

function keyPressed(ev){
    if (isLetter(ev.key)){
        rowsChilds[0][squareCounter].textContent = ev.key;
        if (squareCounter == 4){
            (actualWord.length == 5) ? actualWord = actualWord.slice(0,-1) + ev.key : actualWord += ev.key;
            return false;
        }
        actualWord += ev.key;
        return true;
    }else if (squareCounter >= 0 && ev.code == "Backspace"){
        if (rowsChilds[0][squareCounter].textContent != ""){
            rowsChilds[0][squareCounter].textContent = "";
        }else{
            (squareCounter != 0) ? squareCounter-- : squareCounter = 0;
            squareCounter = squareCounter % 5;
            rowsChilds[0][squareCounter].textContent = ""; 
        }
        actualWord = actualWord.slice(0,-1);
        return false;   
    }else if (squareCounter == 4 && ev.code == "Enter" && rowsChilds[0][squareCounter].textContent != ""){
        const promise = apiConfirmation(actualWord);
        actualWord = "";
        round++;
        return true;
    }
}

function compare(word){
    let correctPosition = 0;
    let numberLettersSelectedWord = mapNumberLetter(selectedWord.split(""));

    for (let i = 0; i < word.length; i++){
        console.log("word[i]: ", word[i]);
        console.log("selectedWord[i]: ", selectedWord[i]);
        if (word[i] == selectedWord[i]){
            rowsChilds[0][i].classList.add("correct");
            numberLettersSelectedWord[word[i]]--;
            correctPosition++;
        }
    }

    for (let i = 0; i < word.length; i++){
        if (word[i] == selectedWord[i]){
            //do nothing
        }
        else if (numberLettersSelectedWord[word[i]] && numberLettersSelectedWord[word[i]] > 0){
            rowsChilds[0][i].classList.add("close");
            numberLettersSelectedWord[word[i]]--;
        }else{
            rowsChilds[0][i].classList.add("wrong");
        }
    }

    if (correctPosition == 5){
        finishGame(true);
    }else if (round == 6){
        finishGame(false);
    }
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

async function apiConfirmation(word){
    infoBarSpiral.classList.remove("hidden");
    const promise = await fetch("https://words.dev-apis.com/validate-word", {
        method: "POST",
        body: JSON.stringify({"word": word})
    })
    infoBarSpiral.classList.add("hidden");
    const processedResponse = await promise.json();
    if (processedResponse.validWord === true){
        compare(word);
        rowsChilds.shift();
        squareCounter = (squareCounter + 1) % 6;
    }else{
        squareCounter--;
        let rowNumber = Math.abs(rowsChilds.length-rows.length);
        rows[rowNumber].classList.add("invalid");
    }
}

async function apiRandomWord(){
    const promise = await fetch("https://words.dev-apis.com/word-of-the-day?random=1");
    const processedResponse = await promise.json();
    selectedWord = processedResponse.word;
    console.log("random word: ", selectedWord);
    infoBarSpiral.classList.add("hidden");
}

function finishGame(bool) {
    if (bool){
        alert("You Win!\nGame finished.");
    }else{
        alert("You lose! The word was ", selectedWord);
    }
    container.removeEventListener('keydown', entryPoint);
}

function entryPoint(ev) {
    if (keyPressed(ev)){
        squareCounter = (squareCounter + 1) % 6;
    }
}

function mapNumberLetter(array){
    obj = {};
    for (let i = 0; i < array.length; i++) {
        if (obj[array[i]]){
            obj[array[i]]++;
        }else{
            obj[array[i]] = 1; 
        }    //arraySelectedWord = selectedWord.split("");

    }
    return obj;
}

const infoBarSpiral = document.querySelector(".info-bar");

let selectedWord;
let round = 0;
apiRandomWord();

//selector to query the divs with class rows
const rows = document.querySelectorAll('.row');
let rowsChilds = [];
makeSquares();

const container = document.getElementsByClassName('container')[0];
container.addEventListener('click',() => {container.focus()});

let actualWord = "";
let squareCounter = 0;
container.addEventListener('keydown', entryPoint);