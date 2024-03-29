<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { Board, TurnState } from "../game-logic/game";
  const dispath = createEventDispatcher()

  export let turn : TurnState = null
  export let hue : number = 0;

  $:hueInv = (hue + 180) % 360



  let saturation = 100
  let lightness  = 50

  let labels = [
    '🐭', '🐲'
  ]

  let boards :Board[] = []
  
  const emptyBoard = (i : number) : Board => {
    const matrix = [
      0,0,0,
      0,0,0,
      0,0,0] as Board['matrix']
    return {
      matrix,
      index: i
    }
    
  }

  onMount(() => {
    for (let index = 0; index < 9; index++) {
      const board = emptyBoard(index)
      boards = [...boards , board];
    }
  });

</script>

  <div 
    class="boards"
    >
    {#each boards as board (board.index) }
    {@const isOdd = board.index % 2}
    {@const index = board.index}
      <div
        style="background-color: {isOdd ? hue : hueInv};"
        class="board"  
        class:odd={isOdd} 
      >
        {labels[index % 2]}
      </div>
    {/each}
  </div>



<style lang="scss">

@keyframes rotating {
  from {
    transform:  perspective(360px) rotateY( 15deg) ;
  }
  to {
    transform:  perspective(360px) rotateY( -15deg)  ;
  }
}

  .boards {

    perspective-origin: 50% 50%;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4px;
  }

  .board {
    height: 100px;
    width: 100px;
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 300px;
    perspective-origin: 50% 50%;

    transform-style: preserve-3d;

    &.odd{
     background-color: hsl( var(--hue , 0)  var(--saturation , 100 )  var(--lightness , 50) );

      // background-color: hsl(, saturation, lightness) ;
    }

    &:not(.odd) {
      // background-color: ;
     background-color: hsl( calc(
        180 + (var(--hue , 0) ) ) 
        var(--saturation , 100 )  
        var(--lightness , 50) );

    }

    &:hover {
      transition: all ease-in-out 200ms;
      filter: brightness( var(--filter , 1.1) );
      // transform:   perspective(360px) rotateY(30deg);
      animation: 250ms ease-in-out rotating alternate infinite;

    } 
  }

</style>