import { fakeLists, fakeTasks } from "@/types/list";
import { SQLiteDatabase } from "expo-sqlite";

export const initDatabase = async (db: SQLiteDatabase) => {
  console.log("Initializing database...");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      completed BOOLEAN NOT NULL,
      dueDate TEXT,
      priority INTEGER DEFAULT 0,
      late BOOLEAN DEFAULT 0,
      list TEXT,
      createdAt TEXT,
      updatedAt TEXT,
      completedAt TEXT,
      synced BOOLEAN DEFAULT 0,
      deleted BOOLEAN DEFAULT 0
    );
  `).then(() => {
    console.log("Task table initialized successfully.");
  }).catch((error) => {
    console.error("Error initializing task table:", error);
  });

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS lists (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      context TEXT,
      createdAt TEXT,
      updatedAt TEXT,
      synced BOOLEAN DEFAULT 0,
      deleted BOOLEAN DEFAULT 0
    );
  `).then(() => {
    console.log("List table initialized successfully.");
  }).catch((error) => {
    console.error("Error initializing list table:", error);
  });

  // console.log("Inserting dummy data into database...");
  // fakeTasks.forEach(async (task) => {
  //   await db.runAsync(
  //     `INSERT OR IGNORE INTO tasks (id, title, description, completed, dueDate, late, list, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
  //     task.id,
  //     task.title,
  //     task.description,
  //     task.completed ? 1 : 0,
  //     task.dueDate,
  //     task.late ? 1 : 0,
  //     task.list,
  //     task.createdAt,
  //   ]);
  // });
  // fakeLists.forEach(async (list) => {
  //   await db.runAsync(
  //     `INSERT OR IGNORE INTO lists (id, name, context, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`, [
  //     list.id,
  //     list.name,
  //     list.context,
  //     list.createdAt,
  //     list.updatedAt,
  //   ]);
  // });

  console.log("Database initialized successfully.");
};

export const dropDatabase = async (db: SQLiteDatabase) => {
  console.log("Dropping database...");
  await db.execAsync(`DROP TABLE IF EXISTS tasks;`);
  await db.execAsync(`DROP TABLE IF EXISTS lists;`);
};

export const resetDatabase = async (db: SQLiteDatabase) => {
  console.log("Resetting database...");
  await dropDatabase(db);
  await initDatabase(db);
};