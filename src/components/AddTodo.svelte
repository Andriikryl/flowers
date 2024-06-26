<script lang="ts">
  type AddTodoType = (todo: string) => void;
  type ToggleCompletedType = (event: MouseEvent) => void;
  type TodosAmountType = number;

  export let addTodo: AddTodoType;
  export let toggleCompleted: ToggleCompletedType;
  export let todosAmount: TodosAmountType;

  let todo = "";

  function handleSubmit() {
    addTodo(todo);
    todo = "";
  }
</script>

<form class="form" on:submit|preventDefault={handleSubmit}>
  {#if todosAmount > 0}
    <div class="flow">
      <input
        on:click={toggleCompleted}
        type="checkbox"
        id="toggle-all"
        class="toggle-all"
      />
      <label
        class="label__coplete"
        aria-label="Mark all as complete"
        for="toggle-all"
      >
        Mark all as complete
      </label>
    </div>
  {/if}

  <!-- svelte-ignore a11y-autofocus -->
  <input
    bind:value={todo}
    id="new-todo"
    class="new__flower"
    placeholder="Add yours flower name"
    type="text"
    autofocus
  />
</form>

<style>
  .form {
    margin-block-end: 20px;
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
  .new__flower {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    line-height: 125%;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--white);
    border: none;
    border-bottom: 2px solid var(--black);
    padding: 12px 16px;
    background-color: transparent;
  }

  .new__flower::placeholder {
    color: var(--white);
  }
  .flow {
    display: flex;
    align-items: center;
  }
  .label__coplete {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 14px;
    line-height: 129%;
    letter-spacing: 0.02em;
    color: var(--white);
    border-bottom: 2px solid var(--black);
    padding: 10px 16px 8px 16px;
    cursor: pointer;
  }
</style>
