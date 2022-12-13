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
    }

}

function keyPressed(ev){
    let numberOfSquare = squareCounter % 5;
    let numberOfRow = Math.floor(squareCounter / 5);
    if (isLetter(ev.key) && ev.code != "Enter" && ev.code != "Backspace"){
        rowsChilds[numberOfRow][numberOfSquare].textContent = ev.key;
        if (numberOfSquare == 4){
            return false;
        }
        return true;
    }else if (squareCounter >= 0 && ev.code == "Backspace"){
        if (rowsChilds[numberOfRow][numberOfSquare].textContent != ""){
            rowsChilds[numberOfRow][numberOfSquare].textContent = "";
        }else{
            (squareCounter != 0) ? squareCounter-- : squareCounter = 0;
            numberOfSquare = squareCounter % 5;
            numberOfRow = Math.floor(squareCounter / 5);
            rowsChilds[numberOfRow][numberOfSquare].textContent = ""; 
        }
        return false;   
    }else if (numberOfSquare == 4 && ev.code == "Enter"){
        return true;
    }
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

//selector to query the divs with class rows
const rows = document.querySelectorAll('.row');
let rowsChilds = [];
makeSquares();

const container = document.getElementsByClassName('container')[0];
container.addEventListener('click',() => {container.focus()});

let squareCounter = 0;
container.addEventListener('keydown', (ev) => {
    if (keyPressed(ev)){
        squareCounter++;
    }
});