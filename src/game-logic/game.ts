export type TurnState = 0 | 1 | null;


export type Board = {
    matrix : TurnState[],
    index: number
}