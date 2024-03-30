<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { toggleState, type Board, type CellState, getBoardProjections, type PlayersIds, type Player } from "../game-logic/game";
  import { emptyMegaBoard } from "../game-logic/matrix-helpers";
  import PlayerMark from "./PlayerMark.svelte";
  import { currentPlayer as currentPlayerComputed, makePlayerMove, playersStore } from "../store/players.store";
  import DomBoard from "./dumbComps/DomBoard.svelte";


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


</script>
  <div 
    class="container"
    class:beforeGame={$currentPlayerComputed == null}
    
    >

    <DomBoard></DomBoard>
  
    <button
      on:click={()=> boards = emptyMegaBoard()}
    >
      clear
    </button>
  </div>





<style lang="scss">



  .container {
    display: flex;
    flex-direction: column;
    cursor: not-allowed;
  }
  

  .beforeGame {
    filter: blur(10px)
  }



</style>