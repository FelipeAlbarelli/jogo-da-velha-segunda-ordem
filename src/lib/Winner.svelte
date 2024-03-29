<script lang="ts" >
import { Fireworks } from 'fireworks-js'


  import { createEventDispatcher, onMount } from 'svelte';

  const dispath = createEventDispatcher<{end: null}>()

  let mouseInside = false;
  let fireworks : Fireworks | null = null;

  $: if (fireworks != null) {
    fireworks.updateOptions({
      mouse: {
        move : mouseInside
      },

    })
    console.log(mouseInside)
  }
  
  onMount( () => {
    const container = document.querySelector('.fireworks')
    fireworks = new Fireworks(container!, {
      autoresize: true,
      // rocketsPoint :
      mouse : {
        move : true,
        max : 5
      }
    })
    fireworks.start()

    fireworks.updateOptions({

    })

    setTimeout( () => {
      fireworks
      dispath('end')
    }, 100_500)
  })

</script>

  <div class="container">
<!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="fireworks"
      on:mouseenter={() => mouseInside = true}
      on:mouseout={() =>   mouseInside = false}
      on:blur={() =>       mouseInside = false}
      >
  
    </div>
  
    <div class="overlay">
      <slot />
    </div>
  </div>


<style lang="scss">
  @keyframes rotating {
    0% {
      transform:  perspective(360px)  rotateY( 90deg) ;
    }
    // 25% {
    //   transform:  perspective(360px)  rotateY( 90deg) ;
    // }
    // 50% {
    //   transform:  perspective(360px)  rotateY( 180deg ) ;
    // }
    // 75% {
    //   transform:  perspective(360px)  rotateY( 270deg ) ;
    // }
    100% {
      transform:  perspective(360px)  rotateY( -90deg ) ;
    }
  }

  .container {
  overflow: hidden;
    position: relative;
  }
  
 .fireworks {
  height: 90vh;
  width: 90vw;
 }

 .overlay {
  /* border: white 1px solid; */
  overflow: hidden;
  position: absolute;
  top: 0;
  height: 90vh;
  width: 90vw;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: 2s linear rotating  infinite;
 }


</style>