<script lang="ts">
  import { getLabelFromId } from "../game-logic/zodiac-heavenly-aritmetic";


    export let id : number | null;
    $: label = getLabelFromId(id ?? 0)
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<p
    on:mouseenter
    on:mouseout
    on:blur
    on:click
>
    {label}
</p>

<style>
    p {
        font-size: 40px;
    }

</style>