import { Store } from '@tauri-apps/plugin-store';
import { Habit, type HabitJSON } from '$lib/models/Habit';

export class HabitService {
    private static instance: HabitService;
    private store: Store | null = null;
    private readonly STORE_KEY = 'quarks_habits';

    private constructor() { }

    public static getInstance(): HabitService {
        if (!HabitService.instance) {
            HabitService.instance = new HabitService();
        }
        return HabitService.instance;
    }

    public async init(): Promise<void> {
        if (!this.store) {
            this.store = await Store.load('habits.json');
        }
    }

    public async getAll(): Promise<Habit[]> {
        await this.init();
        const rawData = await this.store!.get<HabitJSON[]>(this.STORE_KEY);
        if (!rawData) return [];

        return rawData.map((data) => Habit.fromJSON(data));
    }

    public async save(habit: Habit): Promise<void> {
        const habits = await this.getAll();
        const index = habits.findIndex((h) => h.id === habit.id);

        if (index >= 0) {
            habits[index] = habit;
        } else {
            habits.push(habit);
        }

        await this.persist(habits);
    }

    public async delete(id: string): Promise<void> {
        const habits = await this.getAll();
        const filtered = habits.filter((h) => h.id !== id);
        await this.persist(filtered);
    }

    private async persist(habits: Habit[]): Promise<void> {
        await this.init();
        const serialized = habits.map((h) => h.toJSON());
        await this.store!.set(this.STORE_KEY, serialized);
        await this.store!.save();
    }
}
