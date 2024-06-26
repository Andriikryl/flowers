<script lang="ts">
  import Todos from "./components/Todos.svelte";
</script>

<main class="wrapper | wflowers__main">
  <Todos />
</main>

<style>
  .wflowers__main {
    min-height: 100dvh;
    background-image: url(/bg.jpeg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>
