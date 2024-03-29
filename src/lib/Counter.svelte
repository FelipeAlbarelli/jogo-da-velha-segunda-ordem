<script lang="ts">
  export let count: number = 0
  const increment = () => {
    count += 1
    count = count % 2
  }
</script>

<button on:click={increment}>
  count is {count}
</button>
