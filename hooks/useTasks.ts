import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useMemo, useState } from 'react';
import { getAllTasks, updateTask } from '@/db/taskService';
import { Task } from '@/types/task';

export const useTasks = () => {
  const database = useSQLiteContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showPending, setShowPending] = useState(true);

  const { completedTasks, pendingTasks } = useMemo(() => ({
    completedTasks: tasks.filter(task => task.completed),
    pendingTasks: tasks.filter(task => !task.completed)
  }), [tasks]);

  const loadTasks = useCallback(async () => {
    try {
      const loadedTasks = await getAllTasks(database);
      setTasks(loadedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }, [database]);

  const handleTaskCompletion = useCallback(async (task: Task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(database, updatedTask);
      setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }, [database]);

  return {
    tasks,
    completedTasks,
    pendingTasks,
    showCompleted,
    showPending,
    loadTasks,
    handleTaskCompletion,
    setShowCompleted,
    setShowPending
  };
};