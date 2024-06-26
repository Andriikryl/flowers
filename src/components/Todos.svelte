<script lang="ts">
  import { onMount } from "svelte";
  import type { FiltersType, ITodo } from "../types/todo";
  import AddTodo from "./AddTodo.svelte";
  import ClearTodos from "./ClearTodos.svelte";
  import FilterTodos from "./FilterTodos.svelte";
  import Todo from "./Todo.svelte";
  import TodosLeft from "./TodosLeft.svelte";

  let todos: ITodo[] = [
    {
      id: generateRandomId(),
      text: "flower 1",
      completed: false,
      days: [
        { day: "Monday", completed: false, idDay: generateRandomId() },
        { day: "Tuesday", completed: false, idDay: generateRandomId() },
        { day: "Wednesday", completed: false, idDay: generateRandomId() },
        { day: "Thursday", completed: false, idDay: generateRandomId() },
        { day: "Friday", completed: false, idDay: generateRandomId() },
        { day: "Saturday", completed: false, idDay: generateRandomId() },
        { day: "Sunday", completed: false, idDay: generateRandomId() },
      ],
    },
  ];

  let selectedFilter: FiltersType = "all";
  let todosDays;
  $: todosAmount = todos.length;
  $: incompleteTodos = todos.filter((todo) => !todo.completed).length;
  $: filteredTodos = filterTodos(todos, selectedFilter);
  $: completedTodos = todos.filter((todo) => todo.completed).length;

  function generateRandomId(): string {
    return Math.random().toString(16).slice(2);
  }

  function addTodo(todo: string): void {
    let newTodo: ITodo = {
      id: generateRandomId(),
      text: todo,
      completed: false,
      days: [
        { day: "Monday", completed: false, idDay: generateRandomId() },
        { day: "Tuesday", completed: false, idDay: generateRandomId() },
        { day: "Wednesday", completed: false, idDay: generateRandomId() },
        { day: "Thursday", completed: false, idDay: generateRandomId() },
        { day: "Friday", completed: false, idDay: generateRandomId() },
        { day: "Saturday", completed: false, idDay: generateRandomId() },
        { day: "Sunday", completed: false, idDay: generateRandomId() },
      ],
    };
    todos = [...todos, newTodo];
  }

  function toggleCompleted(event: MouseEvent): void {
    let { checked } = event.target as HTMLInputElement;

    todos = todos.map((todo) => ({
      ...todo,
      completed: checked,
    }));
  }

  function completeTodo(id: string): void {
    todos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
  }

  function removeTodo(id: string): void {
    todos = todos.filter((todo) => todo.id !== id);
  }

  function editTodo(id: string, newTodo: string): void {
    let curentTodo = todos.findIndex((todo) => todo.id === id);
    todos[curentTodo].text = newTodo;
  }

  function setFilter(newFilter: FiltersType): void {
    selectedFilter = newFilter;
  }

  function filterTodos(todos: ITodo[], filter: FiltersType): ITodo[] {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
    }
  }

  function clearCompleted(): void {
    todos = todos.filter((todo) => todo.completed !== true);
  }
</script>

<section class="flowers | feature">
  <h1 class="title">Flowers need water</h1>

  <AddTodo {addTodo} {toggleCompleted} {todosAmount} />
  {#if todosAmount}
    <div class="flowers__wrapper">
      <div class="controls__units">
        <TodosLeft {incompleteTodos} />
        <FilterTodos {selectedFilter} {setFilter} />
        <ClearTodos {clearCompleted} {completedTodos} />
      </div>
      <ul class="flower__list" role="list">
        {#each filteredTodos as todo (todo.id)}
          <Todo {todo} {completeTodo} {removeTodo} {editTodo} />
        {/each}
      </ul>
    </div>
  {/if}
</section>

<style>
  .flowers {
    margin-block: 20px;
  }
  .flowers__wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .flower__list {
    flex-basis: 0;
    flex-grow: 999;
    min-inline-size: 50%;
    padding: 0px;
    background-color: var(--accent-light-blue-iii);
    border-radius: 5px;
    margin-block: 0px;
  }
  .controls__units {
    flex-basis: 12rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: var(--accent-light-razzmatazz);
    border-radius: 8px;
    padding: 22px;
    box-shadow:
      0 1px 1px rgba(0, 0, 0, 0.15),
      0 2px 2px rgba(0, 0, 0, 0.15),
      0 4px 4px rgba(0, 0, 0, 0.15),
      0 8px 8px rgba(0, 0, 0, 0.15);
  }
  .title {
    font-family: var(--font-family);
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    margin-block-end: 20px;
    font-size: 32px;
    line-height: 125%;
    letter-spacing: -0.02em;
    color: var(--white);
  }
</style>
