<script lang="ts">
  import User from './lib/User.svelte';
  import MegaBoard from './lib/MegaBoard.svelte';
  import Winner from './lib/Winner.svelte';
  import { startGame, playersStore, winnerPlayer, resetGame } from './store/players.store';
  import { mainTabs, type Tab } from './navigation/constants';
  import { currTab } from './navigation/navigation';
  import TabsNavBar from './navigation/TabsNavBar.svelte';
  import SimpleRouter from './navigation/SimpleRouter.svelte';


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


  currTab.subscribe( s => {
    console.log(s)
  } )


</script>


  <div class="header">
    <TabsNavBar
      tabs={mainTabs}
    ></TabsNavBar>
  </div>

  <main>
    
    {#if $winnerPlayer == null }
    <SimpleRouter 
      bind:p1InitName
      bind:p2InitName
    />
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



  .board-cont {
    display: flex;
    flex-direction: column;
  }

</style>
