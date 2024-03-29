<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispath = createEventDispatcher()
  export let value = '';
  export let myTurn: boolean;
  
</script>

  <div 
    class="card"
    class:myTurn={myTurn}
    >
    {myTurn}
    <input 
      type="text" 
      name="nome"
      bind:value
      placeholder="Nome"
      on:input
    >
  </div>

<style>

  .myTurn {
    outline: blueviolet 4px solid;
    outline-style: dotted;
    outline-offset: 16px;
  }

</style>