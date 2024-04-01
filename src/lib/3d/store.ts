import { derived, writable } from "svelte/store";
import { Vector2, Vector3 } from "three";
import { toPairs } from 'lodash'
import { Maybe } from "purify-ts";
type SceneState = {
    lock : boolean,
    euler: Vector2,
}

export const sceneStore = writable<SceneState>({
    lock: false,
    euler: new Vector2(),
})

export const debugMsg = writable<Record<string , number |  string | null>>({})

export const allDebugMsgs = derived(debugMsg , (objlist) => {
    return toPairs(objlist)
        .filter( ([k,v]) => v !== null && v !== undefined )
        .map( ([key, value]) => [key , typeof value == 'string' ? value : `${value!.toFixed(3)}`] ) as [ string , string][]
})

export const setVectorToDebug = (name: string ,v : Vector3 | number[] | null) => {
    const safeV = Maybe.fromNullable(v)
        .chainNullable( sv =>  (sv instanceof Vector3) ? sv : new Vector3(...(sv )) )
    const finalObj = safeV.caseOf<{[x : string] : number | null}>({
        Just : ({x,y,z}) => ({
            [name + 'x'] : x,
            [name + 'y'] : y,
            [name + 'z'] : z,
        }) ,
        Nothing : () => ({
            [name + 'x'] : null,
            [name + 'y'] : null,
            [name + 'z'] : null,
        })
    })
    debugMsg.update( prev => ({...prev , ...finalObj}) )
}

export const mouseMoveStore = writable<MouseEvent | undefined>(undefined)

export const setMouseLock = (lock : boolean) => {

    sceneStore.update( prev => ({
        ...prev,
        lock 
    }))
}