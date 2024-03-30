<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { getNewPlayer } from "../game-logic/zodiac-heavenly-aritmetic";
  import { createNewPlayerFromName,  playersStore, getMyObj } from "../store/players.store";
  import type { Player } from "../game-logic/game";
  import PlayerMark from "./PlayerMark.svelte";

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
    <h4>{myself.name}</h4>
    <p>{myself.label}</p>
    {/if}
  </div>


<style>

  .card {
    display: flex;
    flex-direction: column;
    width: 180px;
  }

  .myTurn {
    --color: hsl( var(--playerColor , 30) 100%  50% );
    outline: 4px solid;
    outline-color: var(--color);
    outline-style: dotted;
    outline-offset: 16px;
  }


</style>