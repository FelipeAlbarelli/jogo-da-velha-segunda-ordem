<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { toggleState, type Board, type CellState, getBoardProjections, type PlayersIds, type Player } from "../game-logic/game";
  import { emptyMegaBoard } from "../game-logic/matrix-helpers";
  import PlayerMark from "./PlayerMark.svelte";
  import { currentPlayer as currentPlayerComputed, makePlayerMove, playersStore, resetGame } from "../store/players.store";
  import DomBoard from "./dumbComps/DomBoard.svelte";


  const dispath = createEventDispatcher<{
    winner: PlayersIds,
    endTurn : null
  }>()

</script>
  <div 
    class="container"
    class:beforeGame={$currentPlayerComputed == null}
    
    >
    <DomBoard></DomBoard>
    <button
      on:click={()=> resetGame() }
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