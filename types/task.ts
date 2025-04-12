export type Task = {
    id: string; // UUID
    title: string;
    description: string;
    completed: boolean;
    deleted?: boolean; // soft delete para sincronização
}
