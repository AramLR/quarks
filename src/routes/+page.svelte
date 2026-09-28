<script lang="ts">
  import { onMount } from "svelte";
  import { Habit } from "$lib/models/Habit";
  import { HabitService } from "$lib/services/HabitService";

  const habitService = HabitService.getInstance();

  let habits = $state<Habit[]>([]);
  let newHabitName = $state("");

  onMount(async () => {
    await loadHabits();
  });

  async function loadHabits() {
    habits = await habitService.getAll();
  }

  async function handleCreateHabit() {
    if (!newHabitName.trim()) return;

    const habit = new Habit({ name: newHabitName });
    await habitService.save(habit);

    newHabitName = "";
    await loadHabits();
  }

  async function handleComplete(habit: Habit) {
    habit.complete();
    await habitService.save(habit);

    habits = habits.map((h) => (h.id === habit.id ? habit.clone() : h));
  }

  async function handleUndo(habit: Habit) {
    habit.undoComplete();
    await habitService.save(habit);

    habits = habits.map((h) => (h.id === habit.id ? habit.clone() : h));
  }

  async function handleDelete(id: string) {
    await habitService.delete(id);
    await loadHabits();
  }
</script>

<div class="habit-manager">
  <header class="section-header">
    <h2>My Habits</h2>
    <p>Build a routine by increasing your streak each day!</p>
  </header>

  <form
    class="create-form"
    onsubmit={(e) => {
      e.preventDefault();
      handleCreateHabit();
    }}
  >
    <input
      type="text"
      placeholder="Read 5 pages of a book"
      bind:value={newHabitName}
      class="input-habit"
    />
    <button type="submit" class="btn-primary">Create Habit</button>
  </form>

  <div class="habit-list">
    {#each habits as habit (habit.id)}
      <div class="habit-card" class:completed={habit.isCompletedToday}>
        <div class="habit-info">
          <h3>{habit.name}</h3>
          <div class="metrics">
            <span class="badge"
              >Repetitions: <strong>{habit.repetitions}</strong></span
            >
            <span class="badge streak"
              >Current streak: <strong>🔥 {habit.currentStreak} days</strong
              ></span
            >
          </div>
        </div>

        <div class="actions">
          {#if habit.isCompletedToday}
            <button class="btn-action btn-completed" disabled>
              ✓ Completed
            </button>
            <button
              class="btn-action btn-undo"
              onclick={() => handleUndo(habit)}
              title="Deshacer acción de hoy"
            >
              ↩ Undo
            </button>
          {:else}
            <button
              class="btn-action btn-complete"
              onclick={() => handleComplete(habit)}
            >
              ✓ Complete
            </button>
          {/if}

          <button
            class="btn-action btn-delete"
            onclick={() => handleDelete(habit.id)}
          >
            Delete
          </button>
        </div>
      </div>
    {:else}
      <p class="empty-state">
        You have not created any habit yet. Begin by creating the first one!
      </p>
    {/each}
  </div>
</div>

<style>
  .habit-manager {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 800px;
    margin: 0 auto;
  }

  .create-form {
    display: flex;
    gap: 12px;
  }

  .input-habit {
    flex: 1;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background-color: var(--bg-surface);
    color: var(--text-primary);
    outline: none;
  }

  .input-habit:focus {
    border-color: var(--aquamarine-primary);
  }

  .btn-primary {
    padding: 10px 18px;
    background-color: var(--aquamarine-primary);
    color: #000;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .habit-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .habit-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: var(--bg-surface);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    transition: all 0.2s ease;
  }

  .habit-card.completed {
    border-color: rgba(20, 184, 166, 0.4);
    background-color: rgba(18, 24, 31, 0.7);
  }

  .metrics {
    display: flex;
    gap: 12px;
    margin-top: 8px;
  }

  .badge {
    font-size: 0.8rem;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: var(--bg-surface-hover);
    color: var(--text-secondary);
  }

  .badge.streak {
    color: var(--aquamarine-light);
  }

  .actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .btn-action {
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-complete {
    background: rgba(20, 184, 166, 0.2);
    border: 1px solid var(--aquamarine-primary);
    color: var(--aquamarine-light);
  }

  .btn-complete:hover {
    background: var(--aquamarine-primary);
    color: #000;
  }

  .btn-completed {
    background: rgba(20, 184, 166, 0.1);
    border: 1px solid rgba(20, 184, 166, 0.2);
    color: var(--aquamarine-light);
    opacity: 0.8;
    cursor: not-allowed;
  }

  .btn-undo {
    background: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
  }

  .btn-undo:hover {
    border-color: var(--text-secondary);
    color: var(--text-primary);
  }

  .btn-delete {
    background: transparent;
    border: 1px solid transparent;
    color: #ef4444;
  }

  .btn-delete:hover {
    border-color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }

  .empty-state {
    color: var(--text-secondary);
    font-style: italic;
  }
</style>
