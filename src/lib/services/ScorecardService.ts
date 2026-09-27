import { Store } from '@tauri-apps/plugin-store';
import { ScorecardEntry, type ScorecardEntryJSON } from '$lib/models/ScorecardEntry';

export class ScorecardService {
    private static instance: ScorecardService;
    private store: Store | null = null;
    private readonly STORE_KEY = 'quarks_scorecard';

    private constructor() { }

    public static getInstance(): ScorecardService {
        if (!ScorecardService.instance) {
            ScorecardService.instance = new ScorecardService();
        }
        return ScorecardService.instance;
    }

    private async init(): Promise<void> {
        if (!this.store) {
            this.store = await Store.load('scorecard.json');
        }
    }

    public async getAll(): Promise<ScorecardEntry[]> {
        await this.init();
        const rawData = await this.store!.get<ScorecardEntryJSON[]>(this.STORE_KEY);
        if (!rawData) return [];
        return rawData.map((item) => ScorecardEntry.fromJSON(item));
    }

    public async save(entry: ScorecardEntry): Promise<void> {
        const items = await this.getAll();
        const index = items.findIndex((i) => i.id === entry.id);

        if (index >= 0) {
            items[index] = entry;
        } else {
            items.push(entry);
        }

        await this.persist(items);
    }

    public async delete(id: string): Promise<void> {
        const items = await this.getAll();
        const filtered = items.filter((i) => i.id !== id);
        await this.persist(filtered);
    }

    private async persist(items: ScorecardEntry[]): Promise<void> {
        await this.init();
        const serialized = items.map((i) => i.toJSON());
        await this.store!.set(this.STORE_KEY, serialized);
        await this.store!.save();
    }
}
