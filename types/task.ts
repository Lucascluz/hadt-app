export type Task = {
    id: string; // UUID
    title: string;
    description: string;
    completed: boolean;
    dueDate?: string; // data de vencimento da tarefa 
    priority?: number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; // prioridade da tarefa (0-10)
    late?: boolean; // se a tarefa está atrasada
    list?: string; // ID da lista a qual a tarefa pertence
    createdAt?: string; // data de criação da tarefa
    updatedAt?: string; // data de atualização da tarefa
    completedAt?: string; // data de conclusão da tarefa
    deleted?: boolean; // soft delete para sincronização
}