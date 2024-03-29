<script lang="ts">
  import User from './lib/User.svelte';
  import Counter from './lib/Counter.svelte'


  let name1 = 'Felipe'
  let name2 = ''

  let count = 0
  $: turn1 = count == 0;

</script>

<main>

  <div class="container">

  </div>

  <div class="card">
    <User 
      bind:value={name1} 
      myTurn={turn1}      
      ></User>
    <Counter bind:count />
    <User
    bind:value={name2} 
    myTurn={!turn1}     
    ></User>
  </div>

</main>

<style>

</style>
