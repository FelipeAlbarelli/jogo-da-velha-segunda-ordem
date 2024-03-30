import { writable } from "svelte/store";

type SceneState = {
    lock : boolean
}

export const sceneStore = writable<SceneState>({
    lock: false
})