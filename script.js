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
    console.log("keyPressed");
}

//selector to query the divs with class rows
const rows = document.querySelectorAll('.row');
let rowsChilds = [];
makeSquares();

const container = document.getElementsByClassName('container')[0];
container.addEventListener('click',() => {container.focus()});
container.addEventListener('keydown', keyPressed);