<script lang="ts">
    export let filter     = 0.1;
    export let hue        = 30;
    export let saturation = 100;
    export let lightness  = 50;

    let state : 'show' | 'hide' = 'hide'
    const otherState = (state : 'show' | 'hide') => state == 'hide' ? 'show' : 'hide' 
    const toggleState = () => {
        state = otherState(state)
    }

</script>

<button on:click={toggleState} >{otherState(state)}</button>
<div 
    class:hide={state == 'hide'}
    class="hue-selector"
>
    <label>
      <span>filter: {filter}</span>
      <input type="range" bind:value={filter} min="-1" max="1" step="0.05"  />
    </label>
    <label>
      <span>hue: {hue}</span>
      <input type="range" bind:value={hue} min="0" max="180" />
    </label>
    <label>
      <span>sat: {saturation}</span>
      <input type="range" bind:value={saturation} min="0" max="100" />
    </label>
    <label>
      <span>hue: {lightness}</span>
      <input type="range" bind:value={lightness} min="0" max="100" />
    </label> 
</div>

<style lang="scss" >
.hue-selector {
    display: flex;
    flex-direction: column;

    transition: all 500ms ;

    &.hide {
        height: 0px;
        overflow: hidden;
    }

    &>label{
      display: flex;
      &>span {
        width: 100px;
      }
      
    }

    input {
      flex-grow: 1;
    }
}
</style>