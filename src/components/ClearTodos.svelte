<script lang="ts">
  type ClearCompletedType = () => void;
  type CompletedTodosType = number;

  export let clearCompleted: ClearCompletedType;
  export let completedTodos: CompletedTodosType;
</script>

<button
  on:click={clearCompleted}
  class:hidden={completedTodos === 0}
  class="clear__completed"
>
  Clear completed
</button>

<style>
  .clear__completed {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 18px;
    line-height: 133%;
    letter-spacing: 0.01em;
    text-align: center;
    color: var(--black);
    border: 2px solid var(--black);
    border-radius: 6px;
    padding: 8px 16px;
    cursor: pointer;
    background-color: transparent;
  }
</style>
