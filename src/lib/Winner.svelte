<script lang="ts">
  import { onMount } from "svelte";
  import { fireworks } from "tsparticles-fireworks";
  import type { CellState } from "../game-logic/game";

  export let winner: CellState

  
  onMount( async () => {
    const result = await fireworks({
      rate: 3
    })

    setTimeout( ()=> {
      result?.stop();
      winner = null;
    } ,   10_000 )
  
  })

</script>

<div class="container">

</div>
