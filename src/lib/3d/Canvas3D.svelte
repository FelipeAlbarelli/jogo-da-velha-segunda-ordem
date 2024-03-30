<script lang="ts" >
    import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte';
  

  export let width = 500; 
  export let height = 500; 

  $: size = {
    width,
    height
  }


  </script>
<Canvas
  size={size}
>
  <Scene></Scene>
</Canvas>