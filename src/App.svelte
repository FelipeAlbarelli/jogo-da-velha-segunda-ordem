<script lang="ts">
  import User from './lib/User.svelte';
  import Counter from './lib/Counter.svelte'
  import MegaBoard from './lib/MegaBoard.svelte';
  import { toggleState, type CellState } from './game-logic/game';
  import StyleSliders from './lib/StyleSliders.svelte';
  import { Maybe } from 'purify-ts/Maybe';
  import Winner from './lib/Winner.svelte';
  import { areBothReady, chooseFirstPlayerTurn, playersStore , winner} from './store/players.store';

  let saturation = 100
  let lightness  = 50

  let player0 = ''
  let player1 = ''



  let hue: number = 30
  let filter: number = 0.2

  playersStore.subscribe( s => {
    const bothReady = areBothReady(s)
    const currentTurn = s.turn
    if (bothReady && currentTurn == null) {
      chooseFirstPlayerTurn()
    }
  })


  const reset = () => {
    playersStore.update( state => ({
      ...state,
      turn: null,
      winner: null
    }) )
  }


</script>

<main>

  {#if $winner === null}
  <div class="card">
    <User 
      bind:value={player0}
      witchPlayer={1}
      --playerColor={30} 
    ></User>
    <div class="board-cont">
      <MegaBoard
      />
      <!-- <StyleSliders 
        bind:saturation
        bind:hue
        bind:filter
        bind:lightness
      /> -->
    </div>
    <User
      bind:value={player1}
      witchPlayer={2}
      --playerColor={30 + 180}  
    ></User>
  </div>
  {:else}
  <Winner
    on:end={() => reset()}
  >
    <h1> {$winner.label} {$winner.name} {$winner.label} </h1>
  </Winner>
  {/if}

</main>

<style lang="scss">



  .card {
    display: flex;
    flex-direction: row;
    gap: 32px;
  }

  .board-cont {
    display: flex;
    flex-direction: column;
  }

</style>
