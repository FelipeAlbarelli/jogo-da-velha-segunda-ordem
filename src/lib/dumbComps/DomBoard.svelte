<script lang="ts">
  import { currentPlayer, makePlayerMove, megaBoard, playersStore } from "../../store/players.store";
  import Emoji from "./Emoji.svelte";

  megaBoard.subscribe( s => {
    console.log(s.map( x => x.state ))
  })

</script>


<div 
class="boards"
>
{#each $megaBoard as board (board.index) }
{@const index = board.index}
  <!-- svelte-ignore missing-declaration -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    style=" cursor : {$currentPlayer == null ? 'not-allowed' : 'pointer'} "
    class="board"
    class:beforeGame={$currentPlayer == null}
    class:colored={board.state != null}
    class:p1={board.state == $playersStore.p1?.id}
    class:p2={board.state == $playersStore.p2?.id}
    on:click={() => makePlayerMove(index) }
  >
    {#if board.state != null}
    <Emoji>
      {board.player?.label}
    </Emoji>
    {/if}
  </div>
{/each}
</div>

<style lang="scss">
  .boards {

    perspective-origin: 50% 50%;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4px;

  }

.colored {

  cursor: default;
  &.p1{
  background-color: hsl(30, 50%, 50%);

    // background-color: hsl(, saturation, lightness) ;
  }

  &.p2 {
    // background-color: ;
  background-color: hsl(210, 50%, 50%)
  }


}

.board {
  height: 100px;
  width: 100px;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 300px;
  perspective-origin: 50% 50%;
  transform-style: preserve-3d;

  // background-color: #ddd;
  border: 4px solid #eee;


button.beforeGame {
  cursor: not-allowed;
}

&:hover:not(.beforeGame) {
  transition: all ease-in-out 200ms;
  filter: brightness(1.1);
  // transform:   perspective(360px) rotateY(30deg);
  animation: 
    // 200ms linear pump ,
    500ms linear rotating alternate infinite;

} 
}
</style>