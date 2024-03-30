import type { Player } from "./game"

const  labels = [
    '🐭',
    '🐃',
    '🐯',
    '🐰',
    '🐲',
    '🐍',
    '🐴',
    '🐐',
    ['🙈' , '🙉' , '🐵' , '🐒'] ,
    '🐓',
    '🐶',
    ['🐷' , '🐽'] ,
] 


export const getLabelFromId = (i : number | null) => {
    if (i == null) {
        return '*'
    }
    const item = labels[i % 12]
    if (typeof item == 'string') {
        return item
    }
    const heavens_please_guide_my_hand = Math.floor((Math.random() * item.length))
    return item[heavens_please_guide_my_hand]
}

export const createNotUsedId = (current?: number) => {
    let fistTry: null | number = null
    let count = 0;
    fistTry = Math.floor(Math.random() * labels.length)
    while (count < 100 && fistTry == current) {
        fistTry = Math.floor(Math.random() * labels.length)
    }
    return fistTry
}

export const getNewPlayer = (name: string ,id?: number) : Player => {
    const player1Id = createNotUsedId(id);

    return {
        id : player1Id,
        label: getLabelFromId(player1Id),
        name
    }
}

