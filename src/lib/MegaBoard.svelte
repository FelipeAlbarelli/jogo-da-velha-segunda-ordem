<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { Board, TurnState } from "../game-logic/game";
  const dispath = createEventDispatcher()

  export let turn : TurnState = null
  export let hue1 : number = 0;
  export let hue2 : number = 90;


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
    {#each boards as board }

      <div
        style="background-color: hsl({(board.index % 2) ? hue1 : hue2}, 100% , 50%)"
        class="board"
          
      >

      </div>
      
    {/each}

  </div>

<style lang="scss">

  .boards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .board {
    height: 100px;
    width: 100px;

    &.odd{
      // background-color: hsl(, saturation, lightness) ;
    }

    &:not(.odd) {
      // background-color: ;
    }
  }

</style>