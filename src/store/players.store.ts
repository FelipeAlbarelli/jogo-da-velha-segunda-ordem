import { derived, writable } from 'svelte/store';
import type { Player } from '../game-logic/game';
import { getNewPlayer } from '../game-logic/zodiac-heavenly-aritmetic';

type State = {
    p1: Player | null,
    p2: Player | null,
    turn: null |1 | 2,
    winner: 1 | 2 | null
}

export const playersStore = writable<State>({
    p1: null,
    p2: null,
    turn: null,
    winner: null
});

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
        p1 : p1?.id ?? null,
        p2 : p2?.id ?? null
    }
})

export const get12IdFromIdz = ({p1,p2 , id} : Pick<State, 'p1' | 'p2'> & {id: number}) => {
    if (p1?.id == id) {
        return 1
    }
    if (p2?.id == id) {
        return 2
    }
    return null
}

export const setWinnerByIdz = (id : number) => {

    playersStore.update( state => {
        const {p1,p2} = state
        const winner = get12IdFromIdz({p1,p2,id});
        return {
            ...state,
            winner
        }
    })
} 

export const getMyObj = ({p1,p2}: State, selector : 1 | 2) => {
    if (selector == 1) {
        return p1
    }
    return p2
}

export const areBothReady = ({p1,p2}: State) => {
    return p1 !== null && p2 !== null
}

export const setPlayer = ({player,type} : 
{
    player: Player,
    type: 1 | 2
}) => {
    playersStore.update( prev => ({
        ...prev,
        [ type == 1 ? 'p1' : 'p2' ] : player
    }) )
}

const getOtherNumber = (x : 1 | 2) => x == 1 ? 2 : 1

const project    = <T>( [p1,p2] : [T , T] , witch : 1 | 2) => witch == 1 ? p1 : p2

export const createNewPlayerFromName = (name: string , wich : 1 | 2) => {
    playersStore.update( state => {
        const {p1,p2}  = state
        const other    = getOtherNumber(wich)
        const otherId  = project([p1, p2] , other)?.id
        
        const me       = getNewPlayer(name , otherId)

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

export const nextPlayer = () => {
    playersStore.update( ({p1,p2,turn ,winner}) => {
        const next = turn == 1 ? 2 : 1;
        return {
            winner,
            p1,p2,
            turn : next
        }
    })
}