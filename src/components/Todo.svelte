<script lang="ts">
  import type { ITodo } from "../types/todo";
  import Flower from "../icons/Flower.svelte";
  import Water from "../icons/Water.svelte";
  import Date from "./Date.svelte";
  import { curentDayName } from "../utils/date";
  import Sun from "../icons/Sun.svelte";

  type CompleteTodoType = (id: string) => void;
  type RemoveTodoType = (id: string) => void;
  type EditTodoType = (id: string, newTodo: string) => void;

  export let todo: ITodo;
  export let completeTodo: CompleteTodoType;
  export let removeTodo: RemoveTodoType;
  export let editTodo: EditTodoType;
  let editing = false;

  function toggleEdit() {
    editing = true;
  }

  function handleEdit(event: KeyboardEvent, id: string): void {
    let pressedKey = event.key;
    let targetElement = event.target as HTMLInputElement;
    let newTodo = targetElement.value;

    switch (pressedKey) {
      case "Escape":
        targetElement.blur();
        break;
      case "Enter":
        editTodo(id, newTodo);
        targetElement.blur();
        break;
    }
  }

  function handleBlur(event: FocusEvent, id: string): void {
    let targetElement = event.target as HTMLInputElement;
    let newTodo = targetElement.value;

    editTodo(id, newTodo);
    targetElement.blur();
    editing = false;
  }

  $: comletedDays = todo.days.filter((day) => day.completed).length;
  $: daysAmount = todo.days.map((day) => day).length;
</script>

<li class="flower" class:editing>
  <div class="flower__item">
    <Flower />
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <h3
      on:dblclick={toggleEdit}
      class:completed={todo.completed}
      class="flower__name"
    >
      {todo.text}
    </h3>
    {#if editing}
      <!-- svelte-ignore a11y-autofocus -->
      <input
        on:keydown={(event) => handleEdit(event, todo.id)}
        on:blur={(event) => handleBlur(event, todo.id)}
        class="edit"
        type="text"
        value={todo.text}
        autofocus
      />
    {/if}
    <div class="input__group-flower">
      <input
        on:change={() => completeTodo(todo.id)}
        checked={todo.completed}
        id="todo"
        class="flower__toggle"
        type="checkbox"
      />
      <label aria-label="Check todo" class="flower__label" for="todo">
        What needs to be done?</label
      >
    </div>
    <button
      on:click={() => removeTodo(todo.id)}
      aria-label="Remove todo"
      class="remove">Remove</button
    >
    <Date />
    <p class="days__amount">{comletedDays}/{daysAmount}</p>
  </div>

  <ul role="list" class="flower__days">
    {#each todo.days as day, index (index)}
      <li class:active={day.day === curentDayName} class="day">
        <div class:activeWave={day.completed} class="wave"></div>
        <p class="day__name">
          {day.day}
        </p>
        <div class="day__icon">
          {#if day.completed}
            <Water />
          {:else}
            <Sun />
          {/if}
        </div>
        <div class="input__group-day">
          <input
            on:change={() => (day.completed = !day.completed)}
            checked={day.completed}
            id={`todo-day-${day.idDay}`}
            class="toggle__day"
            type="checkbox"
          />
          <label
            aria-label="Check day"
            class="check__day"
            for={`todo-day-${day.idDay}`}>Chack day</label
          >
        </div>
      </li>
    {/each}
  </ul>
</li>

<style>
  .flower {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 10px;
  }
  .flower__item {
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: var(--gray-1);
    border-radius: 8px;
    padding: 22px;
  }
  .flower__name {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 24px;
    text-transform: uppercase;
    color: var(--black);
  }

  .input__group-flower {
    margin-block-end: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .flower__toggle {
    padding: 2px;
    width: 20px;
    height: 20px;
    border: 2px solid var(--black);
    border-radius: 4px;
    cursor: pointer;
  }
  .flower__label {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    line-height: 125%;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--black);
    padding: 12px;
    border-bottom: 2px solid var(--black);
  }
  .remove {
    border: 2px solid var(--black);
    border-radius: 8px;
    padding: 12px 16px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 22px;
    line-height: 127%;
    text-align: center;
    color: var(--black);
    cursor: pointer;
  }
  .flower__days {
    flex-grow: 1;
    flex-shrink: 0;
    padding-inline-start: 0px;
    --min: 15ch;
    --gap: 1rem;
    display: grid;
    grid-gap: var(--gap);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min)), 1fr));
  }

  .day {
    border-radius: 8px;
    padding: 32px;
    background: var(--accent-light-purple-heart);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    box-shadow:
      0 1px 1px rgba(0, 0, 0, 0.15),
      0 2px 2px rgba(0, 0, 0, 0.15),
      0 4px 4px rgba(0, 0, 0, 0.15),
      0 8px 8px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow: hidden;
  }
  .day__name {
    position: relative;
    z-index: 100;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    line-height: 125%;
    letter-spacing: 0.02em;
    color: var(--black);
  }
  .day__icon {
    position: relative;
    z-index: 100;
  }

  .day .wave {
    width: 100%;
    height: 246px;
    background-color: #0096c7;
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 160px;
    transition: 0.4s;
    mix-blend-mode: multiply;
  }
  .activeWave {
    top: 16px !important;
  }
  .day .wave::after,
  .day .wave::before {
    width: 200%;
    height: 100%;
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -75%);
  }

  .day .wave::before {
    border-radius: 45%;
    background-color: var(--white);
    animation: wave 5s linear infinite;
  }

  .day .wave::after {
    border-radius: 40%;
    background-color: var(--white);
    animation: wave 16s linear infinite;
  }

  @keyframes wave {
    0% {
      transform: translate(-50%, -75%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -75%) rotate(360deg);
    }
  }

  .input__group-day {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    z-index: 100;
  }

  .toggle__day {
    width: 16px;
    height: 16px;
    margin-inline: auto;
    cursor: pointer;
    position: relative;
    z-index: 100;
  }
  .check__day {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.02em;
    color: var(--black);
    text-align: center;
    border-bottom: 2px solid var(--black);
    padding: 10px 16px 8px 16px;
    cursor: pointer;
    position: relative;
    z-index: 100;
  }
  .days__amount {
    --size: 50px;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    display: grid;
    place-items: center;
    margin-block-start: 40px;
    border: 2px solid var(--black);
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 22px;
    line-height: 127%;
    text-align: center;
    color: var(--black);
  }
  .active {
    box-shadow:
      0 1px 1px rgba(0, 0, 0, 0.11),
      0 2px 2px rgba(0, 0, 0, 0.11),
      0 4px 4px rgba(0, 0, 0, 0.11),
      0 8px 8px rgba(0, 0, 0, 0.11),
      0 16px 16px rgba(0, 0, 0, 0.11),
      0 32px 32px rgba(0, 0, 0, 0.11);
    border: 2px solid var(--accent-orange);
  }
</style>
