<script lang="ts">
  import User from './lib/User.svelte';
  import Counter from './lib/Counter.svelte'
  import MegaBoard from './lib/MegaBoard.svelte';
  import type { TurnState } from './game-logic/game';


  let name1 = 'Felipe'
  let name2 = 'Pedro'
  let hue2: number
  let hue1: number

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
        bind:hue1
        bind:hue2
        bind:turn
      />
      <label>
        <input type="range" bind:value={hue1} min="0" max="180" />
        <input type="range" bind:value={hue2} min="0" max="180" />
      </label>
      <Counter bind:count={turn} />
    </div>
    <User
    bind:value={name2} 
    myTurn={!turn1}     
    ></User>
  </div>

</main>

<style>

  .card {
    display: flex;
    flex-direction: row;
  }

  .board-cont {
    display: flex;
    flex-direction: column;

  }

</style>
