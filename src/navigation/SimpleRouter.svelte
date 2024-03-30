<script lang="ts">
  import Canvas3D from "../lib/3d/Canvas3D.svelte";
  import View3D from "../lib/3d/Canvas3D.svelte";
import MegaBoard from "../lib/MegaBoard.svelte";
    import User from "../lib/User.svelte";
  import { currTab } from "./navigation";
    export let p1InitName : string;
    export let p2InitName : string;

</script>

{#if $currTab.id == 'dom'  }
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
{:else if  $currTab.id == '3d'}
    <Canvas3D />
{/if}




<style>

.card {
    display: flex;
    flex-direction: row;
    gap: 32px;
  }
</style>