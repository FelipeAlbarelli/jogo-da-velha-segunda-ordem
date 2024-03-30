<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { toggleState, type Board, type CellState, getBoardProjections, type PlayersIds, type Player } from "../game-logic/game";
  import { emptyMegaBoard } from "../game-logic/matrix-helpers";
  import PlayerMark from "./PlayerMark.svelte";
  import { currentPlayer as currentPlayerComputed, nextPlayer, playersIds, playersStore, setWinnerByIdz } from "../store/players.store";


  const dispath = createEventDispatcher<{
    winner: PlayersIds,
    endTurn : null
  }>()

  export let turn : CellState = null

  let boards : Board[] = emptyMegaBoard()
  $:  projectedState = getBoardProjections(boards)

  const boardHoverDict : Record<number , boolean> = {}

  // $: boards.forEach(b => {
  //   console.log(b.state)
  // })
  
  $: if (projectedState.finalWinner !== null) {
    setWinnerByIdz(projectedState.finalWinner);
    dispath('winner' , projectedState.finalWinner as PlayersIds)
  }

  $: {
    console.log(projectedState)
  }

  let prevWinner: number | null = null
  playersStore.subscribe( ({winner}) => {
    if (winner == prevWinner) {
      return
    }
    if (winner != null) {
      boards = emptyMegaBoard();
      prevWinner = winner;
    }
  } )

  let currentPlayer : Partial<Player> = {}
  currentPlayerComputed.subscribe( (x) => {
    if ( x == null) {
      return
    }
    currentPlayer = x
  })

  const mouseHandler = (index : number , val: boolean) => {
    boardHoverDict[index] = val
  }

  const click = (b: Board , i : number) => {
    if (b.state !== null || currentPlayer == null) {
      return
    }
    boards = boards.map( board => {
      if (board.index !== i) {
        return board
      }
      return {
        ...board,
        state: currentPlayer.id ?? turn
      }
    })
    nextPlayer()
    dispath('endTurn')
  }



</script>
  <div 
    class="container"
    class:beforeGame={$currentPlayerComputed == null}
    
    >
    <div 
      class="boards"
      >
      {#each boards as board (board.index) }
      {@const index = board.index}
        <button
          style=" cursor : {$currentPlayerComputed == null ? 'not-allowed' : 'pointer'} "
          class="board"
          class:beforeGame={$currentPlayerComputed == null}
          class:colored={board.state != null}
          class:p1={board.state == $playersIds.p1}
          class:p2={board.state == $playersIds.p2}
          on:click={() => click(board, index)}
        >
          {#if board.state != null}
            <PlayerMark 
            on:click={() => {click(board , index)}}
            id={board.state} />
          {/if}
        </button>
      {/each}
    </div>
  
  
    <button
      on:click={()=> boards = emptyMegaBoard()}
    >
      clear
    </button>
  </div>





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


  .container {
    display: flex;
    flex-direction: column;
    cursor: not-allowed;
  }
  

  .beforeGame {
    filter: blur(10px)
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
     background-color: hsl( var(--hue , 30)  var(--saturation , 100% )  var(--lightness , 50%) );

      // background-color: hsl(, saturation, lightness) ;
    }

    &.p2 {
      // background-color: ;
     background-color: hsl( 
      calc( 180 + (var(--hue , 30) ) ) 
        var(--saturation , 100% )  
        var(--lightness , 50%) );
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


    button.beforeGame {
      cursor: not-allowed;
    }

    &:hover:not(.beforeGame) {
      transition: all ease-in-out 200ms;
      // transform:   perspective(360px) rotateY(30deg);
      animation: 
        // 200ms linear pump ,
        500ms linear rotating alternate infinite;

    } 
  }

</style>