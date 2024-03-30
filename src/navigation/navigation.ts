import { derived, writable } from 'svelte/store';
import { getBoardProjections, type Board, type Player } from '../game-logic/game';
import { getNewPlayer } from '../game-logic/zodiac-heavenly-aritmetic';
import { Maybe } from 'purify-ts';
import { produce } from 'immer';
import { emptyMegaBoard } from '../game-logic/matrix-helpers';
import { mainTabs, type Tab } from './constants';

type NavState = {
    currId : string
}

export const navStore = writable<NavState>({
    currId : mainTabs[0].id
});

export const currTab = derived( navStore , ({currId}) => {
    return mainTabs.find( t => t.id == currId )!
})

export const changeTab = ( id : string ) => {
    const toChange = mainTabs.find( tab => tab.id == id )
    if (toChange == undefined) {
        return
    }
    navStore.set({
        currId: id
    })
}