<script lang="ts">
    import { onMount } from "svelte";
    import {
        ScorecardEntry,
        type HabitClassification,
    } from "$lib/models/ScorecardEntry";
    import { ScorecardService } from "$lib/services/ScorecardService";

    const service = ScorecardService.getInstance();

    let entries = $state<ScorecardEntry[]>([]);
    let actionName = $state("");
    let selectedClassification = $state<HabitClassification>("neutral");

    onMount(async () => {
        await loadEntries();
    });

    async function loadEntries() {
        entries = await service.getAll();
    }

    async function handleAddEntry() {
        if (!actionName.trim()) return;

        const newEntry = new ScorecardEntry({
            actionName: actionName.trim(),
            classification: selectedClassification,
        });

        await service.save(newEntry);
        actionName = "";
        selectedClassification = "neutral";
        await loadEntries();
    }

    async function handleUpdateClassification(
        entry: ScorecardEntry,
        newClassification: HabitClassification,
    ) {
        entry.classification = newClassification;
        await service.save(entry);
        await loadEntries();
    }

    async function handleDelete(id: string) {
        await service.delete(id);
        await loadEntries();
    }
</script>

<div class="scorecard-container">
    <header class="header">
        <h2>Scorecard</h2>
        <p class="description">
            The first step to change a behavior is to be aware of it. Register
            your daily activities and identify them as positive (+), negative
            (-) or neutral (=)
        </p>
    </header>

    <form
        class="entry-form"
        onsubmit={(e) => {
            e.preventDefault();
            handleAddEntry();
        }}
    >
        <input
            type="text"
            placeholder="Turn off the alarm, check my phone, drink water..."
            bind:value={actionName}
            class="input-action"
        />

        <div class="classification-selector">
            <button
                type="button"
                class="class-btn positive"
                class:selected={selectedClassification === "positive"}
                onclick={() => (selectedClassification = "positive")}>+</button
            >
            <button
                type="button"
                class="class-btn neutral"
                class:selected={selectedClassification === "neutral"}
                onclick={() => (selectedClassification = "neutral")}>=</button
            >
            <button
                type="button"
                class="class-btn negative"
                class:selected={selectedClassification === "negative"}
                onclick={() => (selectedClassification = "negative")}>-</button
            >
        </div>

        <button type="submit" class="btn-submit">Register</button>
    </form>

    <!-- Lista de Registros -->
    <div class="scorecard-list">
        {#each entries as entry (entry.id)}
            <div class="score-card-item">
                <span class="action-title">{entry.actionName}</span>

                <div class="controls">
                    <div class="badge-group">
                        <button
                            class="badge-btn positive"
                            class:active={entry.classification === "positive"}
                            onclick={() =>
                                handleUpdateClassification(entry, "positive")}
                            >+</button
                        >
                        <button
                            class="badge-btn neutral"
                            class:active={entry.classification === "neutral"}
                            onclick={() =>
                                handleUpdateClassification(entry, "neutral")}
                            >=</button
                        >
                        <button
                            class="badge-btn negative"
                            class:active={entry.classification === "negative"}
                            onclick={() =>
                                handleUpdateClassification(entry, "negative")}
                            >-</button
                        >
                    </div>

                    <button
                        class="btn-delete"
                        onclick={() => handleDelete(entry.id)}
                    >
                        ✕
                    </button>
                </div>
            </div>
        {:else}
            <div class="empty-state">
                <p>There are no habits registered in your Scorecard</p>
                <span
                    >Begin writting your daily rutine since the moment you are
                    awake</span
                >
            </div>
        {/each}
    </div>
</div>

<style>
    .scorecard-container {
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .header h2 {
        margin: 0 0 8px 0;
        font-size: 1.75rem;
    }

    .description {
        color: var(--text-secondary);
        margin: 0;
        line-height: 1.5;
        font-size: 0.95rem;
    }

    .entry-form {
        display: flex;
        gap: 12px;
        background-color: var(--bg-surface);
        padding: 12px;
        border-radius: 10px;
        border: 1px solid var(--border-color);
    }

    .input-action {
        flex: 1;
        background: transparent;
        border: 1px solid var(--border-color);
        border-radius: 6px;
        padding: 8px 12px;
        color: var(--text-primary);
        outline: none;
    }

    .input-action:focus {
        border-color: var(--aquamarine-primary);
    }

    .classification-selector {
        display: flex;
        gap: 4px;
        background-color: var(--bg-base);
        padding: 3px;
        border-radius: 6px;
    }

    .class-btn {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 4px;
        background: transparent;
        color: var(--text-secondary);
        font-weight: bold;
        cursor: pointer;
    }

    .class-btn.positive.selected {
        background-color: var(--score-positive);
        color: #000;
    }
    .class-btn.neutral.selected {
        background-color: var(--score-neutral);
        color: #fff;
    }
    .class-btn.negative.selected {
        background-color: var(--score-negative);
        color: #fff;
    }

    .btn-submit {
        background-color: var(--aquamarine-primary);
        color: #000;
        font-weight: 600;
        border: none;
        padding: 0 16px;
        border-radius: 6px;
        cursor: pointer;
    }

    .scorecard-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .score-card-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background-color: var(--bg-surface);
        border: 1px solid var(--border-color);
        border-radius: 8px;
    }

    .action-title {
        font-size: 0.95rem;
        color: var(--text-primary);
    }

    .controls {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .badge-group {
        display: flex;
        gap: 4px;
    }

    .badge-btn {
        width: 28px;
        height: 28px;
        border-radius: 4px;
        border: 1px solid var(--border-color);
        background: transparent;
        color: var(--text-secondary);
        cursor: pointer;
        font-weight: bold;
    }

    .badge-btn.positive.active {
        background: var(--score-positive);
        color: #000;
        border-color: var(--score-positive);
    }
    .badge-btn.neutral.active {
        background: var(--score-neutral);
        color: #fff;
        border-color: var(--score-neutral);
    }
    .badge-btn.negative.active {
        background: var(--score-negative);
        color: #fff;
        border-color: var(--score-negative);
    }

    .btn-delete {
        background: transparent;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 1rem;
    }

    .btn-delete:hover {
        color: var(--score-negative);
    }

    .empty-state {
        text-align: center;
        padding: 40px;
        border: 1px dashed var(--border-color);
        border-radius: 8px;
        color: var(--text-secondary);
    }

    .empty-state span {
        font-size: 0.85rem;
        opacity: 0.8;
    }
</style>
