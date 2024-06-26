<script lang="ts">
  import type { FiltersType } from "../types/todo";

  type SetFilterType = (newFilter: FiltersType) => void;

  export let selectedFilter: FiltersType;
  export let setFilter: SetFilterType;

  const filters: FiltersType[] = ["all", "active", "completed"];
</script>

<div class="flow">
  {#each filters as filter}
    <button
      on:click={() => setFilter(filter)}
      class:selected={selectedFilter === filter}
      class="filter__button"
    >
      {filter}
    </button>
  {/each}
</div>

<style>
  .flow {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .filter__button {
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
