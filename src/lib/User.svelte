<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { getNewPlayer } from "../game-logic/zodiac-heavenly-aritmetic";
  import { createNewPlayerFromName,  playersStore, getMyObj } from "../store/players.store";
  import type { Player } from "../game-logic/game";
  import PlayerMark from "./PlayerMark.svelte";
  import Emoji from "./dumbComps/Emoji.svelte";

  export let name  = '';

  export let witchPlayer : 1 | 2;

  $: myself = getMyObj( $playersStore ,witchPlayer)
  $: myTurn  = myself?.id == $playersStore.turn;

  const getReady = () => {
    if (!name.length ) {
      return
    }
    createNewPlayerFromName(name, witchPlayer)
  }

</script>



  <div 
    class="card"
    class:myTurn={myTurn}
  >
  {#if myself == null}
    <input 
      type="text" 
      name="nome"
      bind:value={name}
      placeholder="Nome"
      on:input
    >
    <button 
      disabled={name.length == 0}
      on:click={getReady}>
    Start</button>
    {:else}
    <h4 class="atention" >{myself.name}</h4>
    <Emoji>
      <p class="atention" >{myself.label}</p>
    </Emoji>
    {/if}
  </div>


<style lang="scss" >

  h4  {
    font-size: 30px;
    margin: 0;
  }

  .card {
    display: flex;
    flex-direction: column;
    width: 180px;
  }

  .atention {
    transition: all 200ms linear;
  }

  .myTurn {
    --color: hsl( var(--playerColor , 30) 100%  50% );
    outline: 4px solid;
    outline-color: var(--color);
    outline-style: dotted;
    outline-offset: 16px;

    .atention {
      // transform: scale(1.5);
      filter: brightness(1.25);
      transform: scale(1.4);
        // drop-shadow(2px 2px 0px hsl( var(--playerColor , 30) 100%  50% )) 
        // drop-shadow(2px 2px 0px white ) 
        // drop-shadow(2px 2px 0px hsl( var(--playerColor , 30) 100%  50% )) 
        // drop-shadow(2px 2px 0px white ) 
    }

    
  }


</style>