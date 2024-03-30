import { derived, writable } from 'svelte/store';
import type { Board, Player } from '../game-logic/game';
import { getNewPlayer } from '../game-logic/zodiac-heavenly-aritmetic';
import { Maybe } from 'purify-ts';
import { produce } from 'immer';
import { emptyMegaBoard } from '../game-logic/matrix-helpers';

type State = {
    p1: Player | null,
    p2: Player | null,
    onGame : boolean,
    turn: null |1 | 2,
    winner: 1 | 2 | null,
    board: Board[],
}

export const playersStore = writable<State>({
    p1: null,
    p2: null,
    turn: null,
    winner: null,
    board : emptyMegaBoard(),
    onGame: false,
});

/**DERIVED */

export const winnerPlayer = derived( playersStore , ({p1 ,p2 , winner}) => {
    if (winner == p1?.id) {
        return p1
    } else if (winner == p2?.id) {
        return p2
    }
    return null
})

export const megaBoard = derived( playersStore , ({board , p1 , p2}) => {
    return board.map( board => ({
        ...board,
        player : Maybe.fromNullable(board.state)
            .chainNullable( state => getMyObj({p1, p2 } , state ))
            .extractNullable() 
    }))
} )

export const winner = derived( playersStore , ({winner, p1, p2}) => {
    if (winner == 1) {
        return p1 as Player
    }
    if (winner == 2) {
        return p2 as Player
    }
    return null
} )

export const currentPlayer = derived(playersStore , ({p1, p2 , turn}) => {
    if (turn == 1) {
        return p1 as Player
    }
    if (turn == 2) {
        return p2 as Player
    }
    return null
})

export const playersIds = derived(playersStore , ({p1, p2 , turn}) => {
    return {
        p1 : p1?.zodiacId ?? null,
        p2 : p2?.zodiacId ?? null
    }
})

export const bothPlayersReady = derived( playersStore , ({p1,p2}) => p1 !== null && p2 !== null)

/**HELPERS */

const getOtherNumber = (x : 1 | 2 | null) => Maybe
    .fromNullable(x)
    .chainNullable( y => y == 1 ? 2 : 1)
    .extractNullable()

const pKeyByNumber = (sel : 1 | 2) => sel === 1 ? 'p1' : 'p2'

const getOtherPlayer = ( {p1 ,p2} : Pick<State , 'p1' | 'p2'> ,  {selector} :{selector : 1 | 2}) => selector == 1 ? p2 : p1;


/**ACTIONS */

export const getMyObj = ({p1,p2}: Pick<State , 'p1' | 'p2'>, selector: 1 | 2) => selector == 1 ? p1 : p2 ;

export const setPlayer = ({player,type} : 
{
    player: Player,
    type: 1 | 2
}) => {
    playersStore.update( prev => ({
        ...prev,
        [pKeyByNumber(type)] : player
    }) )
}

export const createNewPlayerFromName = (name: string , wich : 1 | 2) => {
    playersStore.update( state => {
        const {p1 , p2} = state
        const other     = getOtherPlayer({p1 , p2} , { selector : wich })
        const me = getNewPlayer({id: wich , name , other12Id: other?.zodiacId ?? null})
        return {
            ...state,
            [`p${wich}`] : me        
        }
    })
}

export const chooseFirstPlayerTurn = () => {
    const oneOrTwo = (Math.floor(Math.random() * 2) + 1) as 1 | 2
    playersStore.update( state => ({
        ...state,
        turn: oneOrTwo
    }))
}

export const makePlayerMove = (boardIndex : number) => {
    playersStore.update( (state) => {
        const {turn , board} = state;
        const nextTurn = getOtherNumber(turn)

        const newBoard = produce( board , (draft) => {
            draft[boardIndex].state = turn;
        })

        return {
            ...state,
            board: newBoard,
            turn : nextTurn
        }
    })
}