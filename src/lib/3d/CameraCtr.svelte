<script lang="ts" >
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { T, useTask } from '@threlte/core'
import { Vector2, type Camera, Vector3, PerspectiveCamera } from 'three';
  import { interactivity } from '@threlte/extras';
  import { spring } from 'svelte/motion';
  import { Text } from '@threlte/extras'
  import { number } from 'purify-ts';
  import OtherCameraControl from './OtherCameraControl.svelte';

interactivity()

let position = [1,3,1]
export let width = 500; 
export let height = 500; 

let moveForward = false;
let moveBack = false;
let moveLeft = false;
let moveRight = false;

export let mouse
let cam: PerspectiveCamera
let controls : PointerLockControls | undefined;
$: { if (cam != undefined && controls == undefined)
    controls = new PointerLockControls(cam , document.body)
}

let direction = new Vector3()
$: console.log(direction)

let d = new Vector3(1,1,1)
const velocity = new Vector3();
const vertex = new Vector3();
const aceleration = spring(1)

const initialPosition  = [4,4,4]



useTask((delta) => {
    // if (!controls || !camera) {
    //     return
    // }
    // console.log(delta)
    // velocity.x -= velocity.x * 10.0 * delta;
	// velocity.z -= velocity.z * 10.0 * delta;

    // direction.z = Number( moveForward ) - Number( moveBack );
	// direction.x = Number( moveRight ) - Number( moveLeft );
	// direction = direction.normalize(); // this ensures consistent movements in all directions
    // if ( moveForward || moveBack ) velocity.z -= direction.z * 400.0 * delta;
    // if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

    // controls?.moveRight( - velocity.x * delta );
    // controls?.moveForward( - velocity.z * delta );
});





const handleKeyDown = (e: KeyboardEvent) => {
    // console.log(e.key)
    const key = e.key;
    if (key == 'w') {
        moveForward = true
    } else if (key == 's') {
        moveBack = true
    }else if (key == 'a') {
        moveLeft = true
    }else if (key == 'd') {
        moveRight = true
    }
}
const handleKeyUp= (e: KeyboardEvent) => {
    // console.log(e.key)
    const key = e.key;
    if (key == 'w') {
        moveForward = false
    } else if (key == 's') {
        moveBack = false
    }else if (key == 'a') {
        moveLeft = false
    }else if (key == 'd') {
        moveRight = false
    }
}
let lock: () => void
</script>

<svelte:body  on:keydown={handleKeyDown} on:keyup={handleKeyUp} ></svelte:body>

<T.PerspectiveCamera
    makeDefault
    fov={90}
    bind:ref={cam}
    position.x={position[0]}
    position.y={position[1]}
    position.z={position[2]}
    on:create={({ ref }) => {
    ref.lookAt(new Vector3(0, 2, 0))
    }}
> 
<OtherCameraControl bind:lock />
</T.PerspectiveCamera>