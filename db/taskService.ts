import { Task } from '@/types/task';
import { SQLiteDatabase } from 'expo-sqlite';

export async function getAllTasks(db: SQLiteDatabase) {
    const result = await db.getAllAsync(`SELECT * FROM tasks`);
    return result as Task[];
}

export async function getTaskById(db: SQLiteDatabase, id: string) {
    const result = await db.getFirstAsync(`SELECT * FROM tasks WHERE id = ?`, [id]);
    if (result) {
        return result as Task;
    }
    throw new Error(`Task with id ${id} not found`);
}

export async function getTasksByListId(db: SQLiteDatabase, listId: string) {
    const result = await db.getAllAsync(`SELECT * FROM tasks WHERE list = ?`, [listId]);
    if (result) {
        return result as Task[];
    }
    throw new Error(`No tasks found for list id ${listId}`);
}

export async function createTask(db: SQLiteDatabase, task: Task) {

    const isTaskLate = task.dueDate && new Date(task.dueDate) < new Date() ? 1 : 0;

    await db.runAsync(
        `INSERT INTO tasks (id, title, description, completed, dueDate, late, list, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
        [
            task.id,
            task.title ?? '',
            task.description ?? '',
            task.completed ? 1 : 0,
            task.dueDate ?? '',
            task.priority ?? 0,
            isTaskLate,
            task.list ?? '',
            task.createdAt ?? new Date().toISOString(),
        ]
    );
}


export function updateTask(db: SQLiteDatabase, task: Task) {
    const isTaskLate = task.dueDate && new Date(task.dueDate) < new Date() ? 1 : 0;

    return db.runAsync(
        `UPDATE tasks SET title = ?, description = ?, completed = ?, dueDate = ?, late = ?, list = ? WHERE id = ?`,
        [
            task.id,
            task.title ?? '',
            task.description ?? '',
            task.completed ? 1 : 0,
            task.dueDate ?? '',
            isTaskLate,
            task.list ?? '',
            task.updatedAt ?? new Date().toISOString(),
        ]
    );
}

export function deleteTask(db: SQLiteDatabase, task: Task) {

    return db.runAsync(
        `UPDATE tasks SET deleted = 1 WHERE id = ?`,
        [
            task.id,
        ]
    );
}
