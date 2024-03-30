import { getBoardProjections, type Board } from "./game";
import { emptyMegaBoard } from "./matrix-helpers";

let boards : Board[] = emptyMegaBoard()

console.log(boards.map( c => c.state ))

const points = [
    1,2,1,
    2,1,2,
    2,1,2,
]

points.forEach( (p , i) => {
    boards[i].state = p
})


const x = getBoardProjections(boards)

console.log(x)