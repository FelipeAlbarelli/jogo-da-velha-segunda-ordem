<script lang="ts">
  import User from './lib/User.svelte';
  import Counter from './lib/Counter.svelte'
  import MegaBoard from './lib/MegaBoard.svelte';
  import { toggleState, type CellState } from './game-logic/game';
  import StyleSliders from './lib/StyleSliders.svelte';
  import { Maybe } from 'purify-ts/Maybe';

  
  let saturation = 100
  let lightness  = 50

  let name1 = 'Felipe'
  let name2 = 'Pedro'
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

  <div class="container">

  </div>

  <div class="card">
    <User 
      bind:value={name1} 
      myTurn={turn1}      
    ></User>
    <div class="board-cont">
      <MegaBoard
        on:endTurn={ () => {turn = toggleState(turn)} }
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
      <Counter bind:count={turn} />
    </div>
    <User
      bind:value={name2} 
      myTurn={!turn1}     
    ></User>
  </div>

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
