<script lang="ts">
  import User from './lib/User.svelte';
  import Counter from './lib/Counter.svelte'
  import MegaBoard from './lib/MegaBoard.svelte';
  import type { TurnState } from './game-logic/game';

  
  let saturation = 100
  let lightness  = 50

  let name1 = 'Felipe'
  let name2 = 'Pedro'
  let hue: number = 30
  let filter: number = 0.2
  let deg: number = 30


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
        --filter={filter}
        --saturation={saturation + '%'}
        --lightness={lightness + '%'}
      />
      <div class="hue-selector">
        <label>
          <span>filter: {filter}</span>
          <input type="range" bind:value={filter} min="-1" max="1" step="0.05"  />
        </label>
        <label>
          <span>deg: {deg}</span>
          <input type="range" bind:value={deg} min="0" max="90" step="1"  />
        </label>
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

<style lang="scss">

  .hue-selector {
    display: flex;
    flex-direction: column;

    &>label{
      display: flex;
      &>span {
        width: 100px;
      }
      
    }

    input {
      flex-grow: 1;
    }
  }

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
