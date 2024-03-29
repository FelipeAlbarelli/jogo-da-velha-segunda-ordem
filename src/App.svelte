<script lang="ts">
  import User from './lib/User.svelte';
  import Counter from './lib/Counter.svelte'
  import MegaBoard from './lib/MegaBoard.svelte';
  import type { TurnState } from './game-logic/game';

  
  let saturation = 100
  let lightness  = 50

  let name1 = 'Felipe'
  let name2 = 'Pedro'
  let hue: number


  let turn : TurnState = 0
  $: turn1 = turn == 0;

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
        bind:turn
        hue={hue}
        --hue={hue}
        --saturation={saturation + '%'}
        --lightness={lightness + '%'}
      />
      <div class="hue-selector">
        <label>
          <span>hue: {hue}</span>
          <input type="range" bind:value={hue} min="0" max="180" />
        </label>
        <label>
          <span>sat: {saturation}</span>
          <input type="range" bind:value={saturation} min="0" max="100" />
        </label>
        <label>
          <span>hue: {lightness}</span>
          <input type="range" bind:value={lightness} min="0" max="100" />
        </label> 
      </div>
      <Counter bind:count={turn} />
    </div>
    <User
    bind:value={name2} 
    myTurn={!turn1}     
    ></User>
  </div>

</main>

<style>

.hue-selector {
  display: flex;
  flex-direction: column;
}

  .card {
    display: flex;
    flex-direction: row;
  }

  .board-cont {
    display: flex;
    flex-direction: column;

  }

</style>
