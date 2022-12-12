function makeSquares(){
    for (let row of rows) {
        for (let i = 0; i < 5; i++){
            let square = document.createElement("div");
            square.classList.add("square");
            row.appendChild(square);
        }
    }

}

const rows = document.querySelectorAll('.row');
makeSquares();