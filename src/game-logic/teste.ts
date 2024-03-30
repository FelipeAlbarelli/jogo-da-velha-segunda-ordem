import { getBoardProjections, type Board } from "./game";
import { emptyMegaBoard } from "./matrix-helpers";

let boards : Board[] = emptyMegaBoard()

console.log(boards.map( c => c.state ))

boards[0].state = 1;
boards[1].state = 1;
boards[2].state = 2;
const x = getBoardProjections(boards)

console.log(x)