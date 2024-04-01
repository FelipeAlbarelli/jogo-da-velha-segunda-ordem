<script lang="ts" >
    import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte';
  import { Vector2 } from 'three';
  export let mouse = new Vector2()
  import { World } from '@threlte/rapier'
  import { sceneStore } from './store';
	import { interactivity } from '@threlte/extras';

  export let width = 1000; 
  export let height = 750; 

  $: size = {
    width,
    height
  }


  </script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="container">
  <Canvas
    size={size}
  >
  <World>
    <Scene
    ></Scene>
  </World>
  </Canvas>
  {#if $sceneStore.lock }

  <p
  >X</p>
  
  {/if}
</div>

<style lang="scss">

  p {
    position: absolute;
    left: 50%;
    top: 50%;
  }

</style>