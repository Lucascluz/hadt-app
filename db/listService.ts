// import { List } from '@/types/list';
import { List } from '@/types/list';
import { CombinedTaskList } from '@/utils/huggingface-client';
import { SQLiteDatabase } from 'expo-sqlite';
import uuid from 'react-native-uuid';
import { createTask } from './taskService';

export async function getAllLists(db: SQLiteDatabase) {
    const result = await db.getAllAsync(`SELECT * FROM lists`);
    if (result) {
        return result as List[];
    }
    throw new Error('No lists found with the given criteria');
}

export async function getListById(db: SQLiteDatabase, id: string) {
    const result = await db.getFirstAsync(`SELECT * FROM lists WHERE id = ?`, [id]);
    if (result) {
        return result as List;
    }
    throw new Error(`List with id ${id} not found`);
}

export async function createList(db: SQLiteDatabase, list: List) {
    await db.runAsync(
        `INSERT INTO lists (id, name, context, createdAt) VALUES (?, ?, ?, ?)`,
        [
            list.id,
            list.name ?? '',
            list.context ?? '',
            list.createdAt ?? new Date().toISOString(),
        ]
    );
}


export function updateList(db: SQLiteDatabase, list: List) {
    return db.runAsync(
        `UPDATE lists SET name = ?, context = ?,  WHERE id = ?`,
        [
            list.name ?? '',
            list.context ?? '',
            list.id,
        ]
    );
}

export async function deleteList(db: SQLiteDatabase, id: string) {
    await db.runAsync(`DELETE FROM lists WHERE id = ?`, [id]);
}

export async function createListFromGoalPath(db: SQLiteDatabase, goalPath: CombinedTaskList) {
    console.log("Creating list from goal path");
    const listId = uuid.v4();; // Use uuid's v4
    const listName = goalPath.name;
    const listContext = goalPath.context;

    console.log("Creating list with ID:", listId, "and name:", listName);
    
    // Use async/await for database operations
    try {
        await createList(db, {
            id: listId,
            name: listName,
            context: listContext,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(), // Add proper updatedAt
            synced: false,
            deleted: false,
        });

        console.log("Inserting tasks into the list");
        // Use Promise.all for parallel task creation
        await Promise.all(goalPath.tasks.map(async (task) => {
            const taskId = uuid.v4();
            console.log("Inserting task:", task);
            
            await createTask(db, {
                id: taskId,
                title: task.title,
                description: task.description,
                completed: false,
                dueDate: task.dueDate,
                late: false,
                list: listId,
            });
        }));

        return listId;
    } catch (error) {
        console.error("Error in createListFromGoalPath:", error);
        throw error;
    }
}