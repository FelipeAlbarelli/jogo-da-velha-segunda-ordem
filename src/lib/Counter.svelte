<script lang="ts">
  import type { TurnState } from "../game-logic/game";
  import {Maybe} from 'purify-ts'

  export let count: TurnState;
  const increment = () => {
    count = Maybe.fromNullable(count)
      .chainNullable( c => c + 1 )
      .chainNullable< 0 | 1>( c => (c % 2) as 0 | 1 )
      .extractNullable()
    
  }
</script>

<button on:click={increment}>
  count is {count}
</button>
