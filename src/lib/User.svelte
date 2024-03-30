<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { getNewPlayer } from "../game-logic/zodiac-heavenly-aritmetic";
  import { createNewPlayerFromName, getMyObj as selectPlayer, playersStore } from "../store/players.store";
  import type { Player } from "../game-logic/game";
  import PlayerMark from "./PlayerMark.svelte";

  export let value  = '';
  let myTurn = false;
  export let witchPlayer : 1 | 2;
  let me : Player | null;
  $: calc_named = me?.name ?? '--'
  $: my_id = me?.id ?? 0
  playersStore.subscribe( s => {
    console.log(s)
    const myState = selectPlayer(s , witchPlayer)
    me = myState;
  })


  playersStore.subscribe( ({turn}) => {
    myTurn = turn == witchPlayer
  })
  
  const getReady = () => {
    if (!value.length ) {
      return
    }
    createNewPlayerFromName(value, witchPlayer)
  }

</script>



  <div 
    class="card"
    class:myTurn={myTurn}
  >
  {#if  me == null}
    <input 
      type="text" 
      name="nome"
      bind:value
      placeholder="Nome"
      on:input
    >
    <button 
      disabled={value.length == 0}
      on:click={getReady}>
    Start</button>
    {:else}
    <h4>{calc_named}</h4>
    <PlayerMark
      id={my_id}
    />
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