import type { Board } from "./game"

export type BoardLine = [number, number , number]

export const allRowsIndexes = () : BoardLine[] => {
    return [
        [0,1,2],
        [3,4,5],
        [6,7,8]
    ]
}

export const allColsIndexes = () : BoardLine[] => {
    return [
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ]
}

export const allDiagIndexes = () : BoardLine[] => {
    return [
        [0,4,8],
        [2,4,6],
    ]
}

export const allWinningsIndexes = () => {
    return [
        ...allRowsIndexes(),
        ...allColsIndexes(),
        ...allDiagIndexes(),
    ]
}


const emptyBoard = (i : number) : Board => {
    const matrix = [
      0,0,0,
      0,0,0,
      0,0,0] as Board['matrix']
    return {
      matrix,
      state: null,
      index: i
    }
}

export const emptyMegaBoard = () => {
    return [
        0,0,0,
        0,0,0,
        0,0,0,
    ].map( (i, index) => emptyBoard(index))

} 
