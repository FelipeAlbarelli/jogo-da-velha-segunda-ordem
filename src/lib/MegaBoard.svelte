<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { toggleState, type Board, type CellState, getBoardProjections, type TurnState } from "../game-logic/game";
  import { emptyMegaBoard } from "../game-logic/matrix-helpers";


  const dispath = createEventDispatcher<{
    winner: TurnState,
    endTurn : null
  }>()

  let labels = [
    '🐭', '🐲'
  ]
  export let turn : CellState = null

  $: currentPlayerLabel = turn != null ? labels[turn] : '?'


  let boards : Board[] = emptyMegaBoard()
  $:  projectedState = getBoardProjections(boards)

  const boardHoverDict : Record<number , boolean> = {}

  // $: boards.forEach(b => {
  //   console.log(b.state)
  // })
  
  $: if (projectedState.finalWinner !== null) {
    dispath('winner' , projectedState.finalWinner as TurnState)
  }



  const checkForWinner = (boards:  Board[]) => {
  
  }

</script>

  <div 
    class="boards"
    >
    {#each boards as board (board.index) }
    {@const isOdd = board.index % 2}
    {@const index = board.index}
    {@const p1 = board.state == 0}
    {@const p2 = board.state == 1}
      <button
        class="board"
        class:colored={board.state != null}
        class:p1={p1}
        class:p2={p2}

        on:mouseenter={ () => boardHoverDict[index] = true }
        on:mouseout ={ () => boardHoverDict[index] = false }
        on:blur={() => boardHoverDict[index] = false}
        on:click={() => {
          if (board.state !== null) {
            return
          }
          board.state = turn;
          dispath('endTurn')
        }}
      >
        {#if board.state != null}
        {labels[board.state]}
        {:else if  boardHoverDict[index]}
        {currentPlayerLabel}
        {/if}
      </button>
    {/each}
  </div>

  <button
    on:click={()=> boards = emptyMegaBoard()}
  >clear</button>



<style lang="scss">
  @keyframes rotating {
    0% {
      transform:  perspective(360px)  rotateY( 15deg) ;
      // filter: brightness( calc(  var(--filter , 0) + 1  ) );
    }
    100% {
      transform:  perspective(360px)  rotateY( -15deg) ;
      filter: brightness( calc(  var(--filter , 0) + 1  ) );
    }
  }

  @keyframes pump {
    0% {
      transform:  rotateZ(0) ;
      // filter: brightness( calc(  var(--filter , 0) + 1  ) );
    }
    25% {
      transform:  rotateZ(2deg) ;
      // filter: brightness( calc(  var(--filter , 0) + 1  ) );
    }
    50% {
      transform:  rotateZ(0) ;
      // filter: brightness( calc(  var(--filter , 0) + 1  ) );
    }
    75% {
      transform:  rotateZ(-2deg)
    }
  }


  .boards {

    perspective-origin: 50% 50%;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4px;
  }

  .colored {

    cursor: default;
    &.p1{
     background-color: hsl( var(--hue , 0)  var(--saturation , 100 )  var(--lightness , 50) );

      // background-color: hsl(, saturation, lightness) ;
    }

    &.p2 {
      // background-color: ;
     background-color: hsl( calc(
        180 + (var(--hue , 0) ) ) 
        var(--saturation , 100 )  
        var(--lightness , 50) );
    }
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

    // background-color: #ddd;
    border: 4px solid #eee;

    &:hover {
      transition: all ease-in-out 200ms;
      // transform:   perspective(360px) rotateY(30deg);
      animation: 
        // 200ms linear pump ,
        500ms linear rotating alternate infinite;

    } 
  }

</style>