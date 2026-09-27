export type HabitClassification = 'positive' | 'negative' | 'neutral';

export interface ScorecardEntryJSON {
    id: string;
    actionName: string;
    classification: HabitClassification;
    createdAt: string;
}

export class ScorecardEntry {
    public id: string;
    public actionName: string;
    public classification: HabitClassification;
    public createdAt: string;

    constructor(data: Partial<ScorecardEntryJSON> & { actionName: string }) {
        this.id = data.id || crypto.randomUUID();
        this.actionName = data.actionName;
        this.classification = data.classification || 'neutral';
        this.createdAt = data.createdAt || new Date().toISOString();
    }

    public get symbol(): string {
        switch (this.classification) {
            case 'positive': return '+';
            case 'negative': return '-';
            case 'neutral': return '=';
        }
    }

    public toJSON(): ScorecardEntryJSON {
        return {
            id: this.id,
            actionName: this.actionName,
            classification: this.classification,
            createdAt: this.createdAt
        };
    }

    public static fromJSON(json: ScorecardEntryJSON): ScorecardEntry {
        return new ScorecardEntry(json);
    }
}
