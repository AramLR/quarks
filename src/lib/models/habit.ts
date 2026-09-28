export interface HabitJSON {
    id: string;
    name: string;
    repetitions: number;
    currentStreak: number;
    lastCompletedDate?: string;
    cue?: string;
    craving?: string;
    response?: string;
    reward?: string;
}

export class Habit {
    public id: string;
    public name: string;
    public repetitions: number;
    public currentStreak: number;
    public lastCompletedDate?: string;

    public cue: string;
    public craving: string;
    public response: string;
    public reward: string;

    constructor(data: Partial<HabitJSON> & { name: string }) {
        this.id = data.id || crypto.randomUUID();
        this.name = data.name;
        this.repetitions = data.repetitions ?? 0;
        this.currentStreak = data.currentStreak ?? 0;
        this.lastCompletedDate = data.lastCompletedDate;
        this.cue = data.cue || '';
        this.craving = data.craving || '';
        this.response = data.response || '';
        this.reward = data.reward || '';
    }

    public get isCompletedToday(): boolean {
        if (!this.lastCompletedDate) return false;
        const today = new Date().toISOString().split('T')[0];
        return this.lastCompletedDate === today;
    }

    public clone(): Habit {
        return Habit.fromJSON(this.toJSON());
    }

    public complete(): Habit {
        const today = new Date().toISOString().split('T')[0];

        if (this.isCompletedToday) return this;

        if (this.isStreakActive()) {
            this.currentStreak += 1;
        } else {
            this.currentStreak = 1;
        }

        this.repetitions += 1;
        this.lastCompletedDate = today;

        return this;
    }

    public undoComplete(): Habit {
        if (!this.isCompletedToday) return this;

        this.repetitions = Math.max(0, this.repetitions - 1);
        this.currentStreak = Math.max(0, this.currentStreak - 1);
        this.lastCompletedDate = undefined;

        return this;
    }

    private isStreakActive(): boolean {
        if (!this.lastCompletedDate) return false;

        const today = new Date();
        const lastDate = new Date(this.lastCompletedDate);
        const diffTime = Math.abs(today.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays <= 1;
    }

    public toJSON(): HabitJSON {
        return {
            id: this.id,
            name: this.name,
            repetitions: this.repetitions,
            currentStreak: this.currentStreak,
            lastCompletedDate: this.lastCompletedDate,
            cue: this.cue,
            craving: this.craving,
            response: this.response,
            reward: this.reward
        };
    }

    public static fromJSON(json: HabitJSON): Habit {
        return new Habit(json);
    }
}
