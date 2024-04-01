<script lang="ts">
  import { allDebugMsgs, mouseMoveStore, sceneStore } from "../lib/3d/store";
    import type { Tab } from "./constants";
  import { changeTab } from "./navigation";
    export let tabs : Tab[]

</script>

<nav class="tabs-cont">
    <!-- svelte-ignore a11y-missing-attribute -->
    {#each tabs as tab}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <button
        on:click|preventDefault={() => changeTab(tab.id)}
        >{tab.label}
    </button>
    {/each}
</nav>
<!-- <p>{$sceneStore.euler.x} {$sceneStore.euler.y}</p> -->

<div class="debug-info">
    {#each $allDebugMsgs as info }
    <div class="info">
        <p>{info[0]}:</p> <p>{info[1]}</p>
    </div>
    {/each}
</div>

<style>
.debug-info {
    display: flex;
    flex-direction: row;
    
}
    .tabs-cont {
        padding: 12px;
        gap: 8px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

</style>