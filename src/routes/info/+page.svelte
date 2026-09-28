<script lang="ts">
    const appInfo = {
        name: "Quarks",
        author: "Aram Hernández Lara",
        version: "1.0.0-dev.1",
        license: "Source-Available (All Rights Reserved)",
    };

    const currentReleaseFeatures = [
        {
            title: "Habits Scorecard",
            description:
                "A dedicated register to list daily routines and evaluate them as positive (+), negative (-), or neutral (=) to build self-awareness.",
        },
        {
            title: "Core Habit Management",
            description:
                "Create, track, and complete daily habits with automated streak calculations and instantaneous undo support.",
        },
        {
            title: "Native Local Storage",
            description:
                "Integrated local state persistence utilizing Tauri Store Plugin 2.0 for fast and reliable data saves.",
        },
    ];

    const technologies = [
        "Svelte 5",
        "Tauri 2.0",
        "Rust",
        "TypeScript",
        "SvelteKit",
    ];
</script>

<div class="info-container">
    <header class="info-header">
        <div class="title-group">
            <h1>{appInfo.name}</h1>
            <span class="version-badge">v{appInfo.version}</span>
        </div>
        <p class="author">Developed by <strong>{appInfo.author}</strong></p>
    </header>

    <div class="content-grid">
        <div class="main-column">
            <section class="card">
                <h2>About the Application</h2>
                <p>
                    Manual habit tracking is often a complex and tedious
                    process. Furthermore, many current digital alternatives on
                    the market lack core functionality or lock essential
                    features behind paywalls.
                </p>
                <p>
                    <strong>Quarks</strong> was originally created as a personal
                    engineering project to eliminate this friction. However, given
                    its effectiveness in helping visualize and build routines, it
                    was made public to provide a distraction-free environment for
                    anyone looking to apply the philosophy of continuous 1% improvements.
                </p>
            </section>

            <section class="card">
                <h2>Credits & Methodology</h2>
                <p>
                    <strong>Quarks</strong> is deeply inspired by the work of
                    <strong>James Clear</strong>, author of the bestselling book
                    <em>Atomic Habits</em>. The core methodology behind this app
                    ,including the four-step habit loop (Cue, Craving, Response,
                    and Reward) and the philosophy of small, compounding 1%
                    improvements, was developed and popularized by Clear, and
                    all credit for these ideas belongs to him.
                </p>
                <p>
                    This app also draws inspiration from <strong>Atoms</strong>,
                    the official habit-tracking app created by James Clear and
                    his team to complement <em>Atomic Habits</em>.
                </p>
                <p class="disclaimer">
                    <em>Note:</em> Quarks is an independent, unofficial project
                    built by a fan of this methodology. It is not affiliated
                    with, endorsed by, or produced by James Clear or the Atoms
                    app, and it is not intended to imitate, copy, or compete
                    with Atoms in any way. If you're looking for the official
                    experience, we encourage you to check out
                    <a
                        href="https://atoms.jamesclear.com"
                        target="_blank"
                        rel="noopener noreferrer">Atoms</a
                    >
                    directly.
                </p>
            </section>

            <section class="card">
                <h2>Legal Notice & License</h2>
                <p>
                    <strong
                        >Source-Available License (All Rights Reserved)</strong
                    ><br />
                    The source code of this application is publicly viewable for
                    transparency. However,
                    <em>it is not open-source software</em>. No one is permitted
                    to modify, distribute, sublicense, commercialize, or create
                    derivative works from this software without explicit
                    permission from the author.
                </p>
                <p class="disclaimer">
                    <em>Legal Disclaimer:</em> The software is provided "as is",
                    without warranty of any kind, express or implied. The author
                    shall not be liable for any data loss, damages, or other consequences
                    arising from the use of this application.
                </p>
            </section>
        </div>

        <div class="side-column">
            <section class="card release-section">
                <h2>What's in v{appInfo.version}</h2>
                <p class="release-intro">
                    Key capabilities included in this release build:
                </p>

                <div class="release-list">
                    {#each currentReleaseFeatures as feature}
                        <div class="release-item">
                            <div class="bullet-point"></div>
                            <div class="release-details">
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            </section>

            <section class="card">
                <h2>Technologies</h2>
                <div class="tech-tags">
                    {#each technologies as tech}
                        <span class="tech-tag">{tech}</span>
                    {/each}
                </div>
            </section>
        </div>
    </div>
</div>

<style>
    .info-container {
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 32px;
        padding-bottom: 40px;
    }

    .info-header {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-bottom: 24px;
        border-bottom: 1px solid var(--border-color);
    }

    .title-group {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .logo-placeholder {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: var(--aquamarine-primary);
        box-shadow: 0 0 16px var(--aquamarine-glow);
    }

    h1 {
        margin: 0;
        font-size: 2.5rem;
        font-weight: 800;
        letter-spacing: 0.02em;
    }

    .version-badge {
        background-color: var(--aquamarine-glow);
        color: var(--aquamarine-light);
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
        border: 1px solid rgba(20, 184, 166, 0.3);
    }

    .author {
        margin: 0;
        color: var(--text-secondary);
        font-size: 1.1rem;
    }

    .author strong {
        color: var(--text-primary);
    }

    .content-grid {
        display: grid;
        grid-template-columns: 3fr 2fr;
        gap: 24px;
        align-items: start;
    }

    .card {
        background-color: var(--bg-surface);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 24px;
    }

    .card h2 {
        margin-top: 0;
        margin-bottom: 16px;
        font-size: 1.25rem;
        color: var(--aquamarine-primary);
    }

    .card p {
        margin-top: 0;
        margin-bottom: 16px;
        line-height: 1.6;
        color: var(--text-secondary);
    }

    .card p:last-child {
        margin-bottom: 0;
    }

    .card strong {
        color: var(--text-primary);
    }

    .card em {
        color: var(--text-primary);
        font-style: italic;
    }

    .disclaimer {
        font-size: 0.85rem;
        opacity: 0.8;
        border-top: 1px dashed var(--border-color);
        padding-top: 12px;
        margin-top: 12px;
    }

    .release-intro {
        font-size: 0.875rem;
        color: var(--text-secondary);
        margin-bottom: 16px !important;
    }

    .release-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .release-item {
        display: flex;
        gap: 12px;
        align-items: flex-start;
    }

    .bullet-point {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--aquamarine-light);
        margin-top: 6px;
        flex-shrink: 0;
        box-shadow: 0 0 8px var(--aquamarine-glow);
    }

    .release-details h3 {
        margin: 0 0 4px 0;
        font-size: 0.95rem;
        color: var(--text-primary);
        font-weight: 600;
    }

    .release-details p {
        margin: 0;
        font-size: 0.85rem;
        color: var(--text-secondary);
        line-height: 1.4;
    }

    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .tech-tag {
        background-color: var(--bg-base);
        border: 1px solid var(--border-color);
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 0.85rem;
        color: var(--text-primary);
    }

    @media (max-width: 768px) {
        .content-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
