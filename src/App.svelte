<script lang="ts">
  import User from './lib/User.svelte';
  import Counter from './lib/Counter.svelte'
  import MegaBoard from './lib/MegaBoard.svelte';
  import type { TurnState } from './game-logic/game';
  import StyleSliders from './lib/StyleSliders.svelte';

  
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
