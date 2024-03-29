<script lang="ts">
  import { toggleState, type CellState } from "../game-logic/game";
  import {Maybe} from 'purify-ts'

  export let count: CellState;
  const increment = () => {
    count = Maybe.fromNullable(count)
      .chainNullable( toggleState )
      .extractNullable()
  }
</script>

<button on:click={increment}>
  count is {count}
</button>
