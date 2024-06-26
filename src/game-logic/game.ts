import { Maybe } from "purify-ts";
import { allWinningsIndexes } from "./matrix-helpers";

export type CellState = PlayersIds | null;
export type PlayersIds     = number;

export type Player = {
    id: PlayersIds,
    label: string,
    name: string
}

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
        const [a,b,c] = line
        if (a == b && b == c) {
            console.log(line)
            return a
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