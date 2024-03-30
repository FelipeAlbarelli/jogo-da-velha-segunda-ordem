<script lang="ts" >
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { T, useTask } from '@threlte/core'
  import type { Camera } from 'three';
  import { onMount } from 'svelte';

let camera:  Camera | undefined; 
let controls : PointerLockControls | undefined;
$: { if (camera != undefined && controls == undefined)
    controls = new PointerLockControls(camera , document.body)
}




</script>


<T.PerspectiveCamera
    makeDefault
    position={[10, 10, 10]}
    on:create={({ ref }) => {
        camera = ref;
        ref.lookAt(0, 1, 0)
    }}
> 
</T.PerspectiveCamera>