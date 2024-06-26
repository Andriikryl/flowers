<script lang="ts">
  export let incompleteTodos: number;
</script>

<h4 class="flowers__count">
  {incompleteTodos}
  {incompleteTodos === 1 ? "flower" : "flowers"} active
</h4>

<style>
  .flowers__count {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 24px;
    color: var(--black);
    text-align: center;
  }
</style>
