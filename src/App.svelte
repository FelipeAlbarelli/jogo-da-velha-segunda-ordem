<script lang="ts">
  import User from './lib/User.svelte';
  import Counter from './lib/Counter.svelte'
  import MegaBoard from './lib/MegaBoard.svelte';
  import { toggleState, type CellState } from './game-logic/game';
  import StyleSliders from './lib/StyleSliders.svelte';
  import { Maybe } from 'purify-ts/Maybe';
  import Winner from './lib/Winner.svelte';

  let saturation = 100
  let lightness  = 50

  let player0 = 'Felipe'
  let player1 = 'Pedro'

  let winner: CellState = null

  $: winnerName = Maybe.fromNullable(winner)
    .chainNullable( w => w == 0 ? player0 : player1 )
    .extractNullable()

  let hue: number = 30
  let filter: number = 0.2

  let turn : CellState = 0
  $: turn1 = turn == 0;

  const handleTurn = () => {
    if (turn == null){return}
    turn =  toggleState(turn);
    console.log(`turno atual: ${turn}`)
  } 




</script>

<main>

  {#if winnerName === null}
  <div class="card">
    <User 
      bind:value={player0} 
      myTurn={turn1}      
    ></User>
    <div class="board-cont">
      <MegaBoard
        on:endTurn={ () => {turn = toggleState(turn)} }
        on:winner={(event) => { winner = event.detail  }}
        turn={turn}
        --hue={hue}
        --filter={filter}
        --saturation={saturation + '%'}
        --lightness={lightness + '%'}
      />
      <StyleSliders 
        bind:saturation
        bind:hue
        bind:filter
        bind:lightness
      />
    </div>
    <User
      bind:value={player1} 
      myTurn={!turn1}     
    ></User>
  </div>
  {:else}
  <Winner
    bind:winner
  />
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
