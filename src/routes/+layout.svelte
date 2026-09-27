<script lang="ts">
    import { type Snippet } from "svelte";
    import type { NavRoute } from "$lib/types";

    let { children }: { children: Snippet } = $props();

    let currentRoute = $state<NavRoute>("dashboard");

    function navigateTo(route: NavRoute) {
        currentRoute = route;
    }
</script>

<div class="app-container">
    <header data-tauri-drag-region class="tauri-header">
        <div class="window-title">Quarks</div>
    </header>

    <div class="layout-body">
        <aside class="sidebar">
            <div class="brand">
                <h1 class="brand-name">Quarks</h1>
            </div>

            <nav class="nav-menu">
                <button
                    class="nav-item"
                    class:active={currentRoute === "dashboard"}
                    onclick={() => navigateTo("dashboard")}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        ><path
                            d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                        /><polyline points="9 22 9 12 15 12 15 22" /></svg
                    >
                    <span>Dashboard</span>
                </button>

                <button
                    class="nav-item"
                    class:active={currentRoute === "info"}
                    onclick={() => navigateTo("info")}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        ><circle cx="12" cy="12" r="10" /><path
                            d="M12 16v-4"
                        /><path d="M12 8h.01" /></svg
                    >
                    <span>Info</span>
                </button>
            </nav>

            <div class="sidebar-footer">
                <span class="version-tag">Development version</span>
            </div>
        </aside>

        <main class="main-content">
            {@render children()}
        </main>
    </div>
</div>

<style>
    :root {
        --bg-base: #090d10;
        --bg-surface: #12181f;
        --bg-surface-hover: #1a232d;
        --border-color: #1f2937;

        --text-primary: #f3f4f6;
        --text-secondary: #9ca3af;

        --aquamarine-primary: #14b8a6;
        --aquamarine-light: #2dd4bf;
        --aquamarine-glow: rgba(20, 184, 166, 0.15);
    }

    :global(body) {
        margin: 0;
        padding: 0;
        background-color: var(--bg-base);
        color: var(--text-primary);
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            sans-serif;
        user-select: none;
        overflow: hidden;
    }

    .app-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
    }

    .tauri-header {
        height: 32px;
        background-color: var(--bg-base);
        display: flex;
        align-items: center;
        padding: 0 16px;
        border-bottom: 1px solid var(--border-color);
        font-size: 0.75rem;
        color: var(--text-secondary);
    }

    .layout-body {
        display: flex;
        flex: 1;
        overflow: hidden;
    }

    .sidebar {
        width: 240px;
        background-color: var(--bg-surface);
        border-right: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
        padding: 20px 16px;
    }

    .brand {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 32px;
        padding: 0 8px;
    }

    .brand-name {
        font-size: 1.25rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        margin: 0;
        color: var(--text-primary);
    }

    .nav-menu {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
    }

    .nav-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 14px;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 8px;
        color: var(--text-secondary);
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .nav-item:hover {
        background-color: var(--bg-surface-hover);
        color: var(--text-primary);
    }

    .nav-item.active {
        background-color: var(--aquamarine-glow);
        border-color: rgba(20, 184, 166, 0.3);
        color: var(--aquamarine-light);
    }

    .sidebar-footer {
        padding: 8px;
        border-top: 1px solid var(--border-color);
    }

    .version-tag {
        font-size: 0.7rem;
        color: var(--text-secondary);
    }

    .main-content {
        flex: 1;
        padding: 32px;
        overflow-y: auto;
        background-color: var(--bg-base);
    }
</style>
