<script lang="ts">
  import User from './lib/User.svelte';
  import Counter from './lib/Counter.svelte'
  import MegaBoard from './lib/MegaBoard.svelte';
  import { toggleState, type CellState } from './game-logic/game';
  import StyleSliders from './lib/StyleSliders.svelte';
  import { Maybe } from 'purify-ts/Maybe';
  import Winner from './lib/Winner.svelte';
  import { startGame, playersStore, winnerPlayer, resetGame } from './store/players.store';
  import Tabs from './navigation/Tabs.svelte';
  import { mainTabs, type Tab } from './navigation/constants';


  let tabs = mainTabs
  let saturation = 100
  let lightness  = 50

  let p1InitName = 'Felipe'
  let p2InitName = 'Pedro'



  let hue: number = 30
  let filter: number = 0.2

  playersStore.subscribe( s => {
    const bothReady = s.p1 != null && s.p2 != null;
    const currentTurn = s.turn
    if (bothReady && currentTurn == null) {
      startGame()
    }
  })


</script>


  <div class="header">
    <Tabs
      tabs={mainTabs}
    ></Tabs>
  </div>

  <main>
  
  
    {#if $winnerPlayer == null }
    <div class="card">
      <User 
        bind:name={p1InitName}
        witchPlayer={1}
        --playerColor={30} 
      ></User>
      <div class="board-cont">
        <MegaBoard
        />
      </div>
      <User
        bind:name={p2InitName}
        witchPlayer={2}
        --playerColor={30 + 180}  
      ></User>
    </div>
    {:else}
    <Winner
      on:end={() => resetGame()}
    >
      <h1> {$winnerPlayer.label} {$winnerPlayer.name} {$winnerPlayer.label} </h1>
    </Winner>
    {/if}
  
  </main>
  <div class="footer"></div>


<style lang="scss">

  .header{
    // height: 120px;
    position: absolute;
    top: 0;
    width: 100vw;

  }

  .footer{

  }

  main {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
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
