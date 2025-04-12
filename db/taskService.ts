import { Task } from '@/types/task';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('hadt.db');

export function getAllTasks() {
    
}

export function addTask(task: Task) {

}

export function updateTask(task: Task) {

}

export function deleteTask(id: string) {

}
