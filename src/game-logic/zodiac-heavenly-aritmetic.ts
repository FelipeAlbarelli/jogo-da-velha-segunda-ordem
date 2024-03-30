import { Maybe, number } from "purify-ts"
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

export const randIntOnInterval = ( {max,min , type} : {min : number , max : number , type : 'int' | 'float'}) => {
    const delta       = max - min;
    const zeroToOne   = Math.random()
    const minToMax = zeroToOne * delta;
    const randFloatOnInterval = minToMax + min;
    if (type == "float") {
        return randFloatOnInterval
    }
    return Math.floor(randFloatOnInterval)
}

export const getRandom12UniqNumber = ({ min = 0 , current , max = 11 } :{current : number , min: number , max : number}) => {
    // maneira procedural cringe
    // while (count < 100 && fistTry == currentPlayerZId  ) {
    //     fistTry = Math.floor(Math.random() * labels.length)
    // }

    /** set all as number betwenn 0 and N */
    const currNorm    = current - min; 
    const maxNorm     = max     - min;

    /** use modulo based arit to get n \in [0 , maxNorm] & n != currNorm  */
    const offset      = Math.floor( Math.random() * maxNorm - 1 )
    const resultNorm  = ( currNorm + offset ) % maxNorm

    // add min to get previous based number
    return resultNorm + min

}

export const createNotUsedId = (current: Maybe<number>) => {
    let fistTry: null | number = null
    let count = 0;
    fistTry = Math.floor(Math.random() * labels.length)
    const currentPlayerZId = current.extractNullable()
    if (currentPlayerZId == null ) {
        return fistTry
    }
    while (count < 100 && fistTry == currentPlayerZId  ) {
        fistTry = Math.floor(Math.random() * labels.length)
    }
    return fistTry
}

export const getNewPlayer = ( {id , name , other12Id} : {name: string , id : 1 | 2, other12Id: number | null }  ) : Player => {
    const maybeOther = Maybe.fromNullable(other12Id)
    const zodiacId   = maybeOther.caseOf({
        Just: (current) => getRandom12UniqNumber({
            min :0,
            max: 11,
            current
        }),
        Nothing : () => randIntOnInterval({min: 0 , max : 11, type : 'int'})
    })
    return {
        zodiacId,
        label: getLabelFromId(zodiacId),
        id,
        name
    }
}

