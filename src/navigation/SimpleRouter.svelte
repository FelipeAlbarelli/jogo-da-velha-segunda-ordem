<script lang="ts">
  import MegaBoard from "../lib/MegaBoard.svelte";
    import User from "../lib/User.svelte";
    export let p1InitName : string;
    export let p2InitName : string;

</script>

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



<style>

.card {
    display: flex;
    flex-direction: row;
    gap: 32px;
  }
</style>