<script lang="ts">
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


<style>
    .tabs-cont {
        padding: 12px;
        gap: 8px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

</style>