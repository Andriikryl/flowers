<script lang="ts">
  import { curentDayName } from "../utils/date";

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const curentDate = new Date().getUTCDate();
  const months = Array.from({ length: 12 }, (e, i) => {
    return new Date(1970, i, 1).toLocaleDateString("en", { month: "long" });
  });
</script>

<p class="date">
  Today is {curentDayName}
  {curentDate}, of {months[currentMonth]}
  {currentYear}
</p>

<style>
  .date {
    margin-block-start: 30px;
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 18px;
    line-height: 125%;
    letter-spacing: 0.02em;
    color: var(--black);
  }
</style>
