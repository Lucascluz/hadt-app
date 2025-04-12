import * as SQLite from 'expo-sqlite';

export async function initDB() {
    const db = await SQLite.openDatabaseAsync('hadt.db');

    // `execAsync()` is useful for bulk queries when you want to execute altogether.
    // Note that `execAsync()` does not escape parameters and may lead to SQL injection.
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            completed INTEGER NOT NULL DEFAULT 0,
            deleted INTEGER NOT NULL DEFAULT 0
`);
}