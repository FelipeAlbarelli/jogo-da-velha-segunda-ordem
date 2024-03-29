import { Maybe } from "purify-ts";
import { allWinningsIndexes } from "./matrix-helpers";

export type CellState = 0 | 1 | null;
export type TurnState     = 0 | 1;

export type Board = {
    matrix : CellState[],
    state : CellState,
    index: number
}

export const toggleState = (state : CellState) => Maybe.fromNullable(state)
    .chainNullable( c => c == 0 ? 1 : 0 )
    .extractNullable()

export const getBoardProjections = ( board : Board[] ) => {
    const indexesMatrix = allWinningsIndexes()
    const projectedState = indexesMatrix.map( (relevantIndexes) => 
        relevantIndexes.map( i => board[i].state ) as [CellState , CellState , CellState]
    )
    const winnerPerLine = projectedState.map( (line) => {
        if (line.every( i => i == 0 )) {
            return 0
        }
        if (line.every( i => i == 1 )) {
            return 1
        }
        return null
    })
    const someWinner = winnerPerLine.filter( w => w != null)
    const finalWinner = someWinner.at(0)
    return {
        projectedState,
        winnerPerLine,
        finalWinner : finalWinner ?? null
    }
}