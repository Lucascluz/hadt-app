import { ViewModeSelect } from '@/components/ViewModeSelect';
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon } from '@/components/ui/button';
import { Fab, FabIcon } from '@/components/ui/fab';
import { HStack } from '@/components/ui/hstack';
import { AddIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, Icon, StarIcon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { VStack } from '@/components/ui/vstack';
import { getAllTasks, updateTask } from '@/db/taskService';
import { Task } from '@/types/task';
import { formatDateTime } from '@/utils/utils';
import { router, useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [showCompletedTasks, setShowCompletedTasks] = useState(false);
    const [showPendingTasks, setShowIncompletedTasks] = useState(true);
    const database = useSQLiteContext();

    // Derive task states from the main tasks array
    const todayTasks = tasks.filter(task => new Date(task.dueDate ?? 0).toDateString() === new Date().toDateString());
    const completedTasks = todayTasks.filter(task => task.completed);
    const pendingTasks = todayTasks.filter(task => !task.completed);

    useFocusEffect(
        useCallback(() => {
            const fetchTasks = async () => {
                const allTasks = await getAllTasks(database);
                setTasks(allTasks);
            };
            fetchTasks();
        }, [database]) // Include database in dependencies
    );

    const handleViewModeChange = (value: string) => {
        console.log("Selected view mode: ", value);
        // Handle view mode change logic here
        // For example, you can filter tasks based on the selected view mode
        switch (value) {
            case '1':
                setTasks(tasks.filter(task => new Date(task.dueDate ?? 0).toDateString() === new Date().toDateString()));
                break;
            case '2':
                setTasks(tasks.filter(task => new Date(task.dueDate ?? 0).getTime() > new Date().getTime()));
                break;
            case '3':
                setTasks(tasks.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0)));
                break;
            default:
                setTasks(tasks.filter(task => new Date(task.dueDate ?? 0).toDateString() === new Date().toDateString()));
        }
    };

    const handleTaskCompletion = async (task: Task) => {
        const updatedTask = { ...task, completed: !task.completed };
        await updateTask(database, updatedTask);
        setTasks(prevTasks =>
            prevTasks.map(t => t.id === task.id ? updatedTask : t)
        );
    };

    return (
        <SafeAreaView className='flex-1'>
            <View className='justify-center items-center pt-4'>
                <Text className="text-3xl font-bold">Dash</Text>
            </View>

            <View className='px-4'>
                <ViewModeSelect onViewModeChange={handleViewModeChange} />
            </View>

            <ScrollView className='w-full'>
                {/* Pending Tasks Section */}
                <Box className='bg-white m-4 p-4 rounded-xl shadow-md'>
                    <Pressable onPress={() => setShowIncompletedTasks(!showPendingTasks)}>
                        <HStack className='items-center justify-between p-2'>
                            <Text className="text-lg font-bold">Pending Tasks</Text>
                            <Icon className='text-black' as={showPendingTasks ? ChevronUpIcon : ChevronDownIcon} size='lg' />
                        </HStack>
                    </Pressable>

                    {showPendingTasks && (
                        <VStack className='mt-2 space-y-4'>
                            {pendingTasks.map((task) => (
                                <Pressable
                                    className='py-4 rounded-lg'
                                    key={task.id}
                                    onPress={() => router.push({
                                        pathname: '/task/[id]/index.',
                                        params: { id: task.id }
                                    })}
                                >
                                    <HStack className='items-center gap-4'>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className='w-10 h-10 rounded-full'
                                            onPress={() => handleTaskCompletion(task)}
                                        >
                                            <ButtonIcon
                                                as={task.completed ? CheckIcon : Icon}
                                                className='text-blue-500'
                                            />
                                        </Button>
                                        <VStack>
                                            <Text className="text-lg font-bold">{task.title}</Text>
                                            <Text className={`text-sm ${task.late ? "text-red-500" : "text-blue-500"}`}>
                                                {formatDateTime(task.dueDate)}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </Pressable>
                            ))}
                        </VStack>
                    )}
                </Box>

                {/* Completed Tasks Section */}
                {completedTasks.length > 0 && (
                    <Box className='bg-white m-4 p-4 rounded-xl shadow-md'>
                        <Pressable onPress={() => setShowCompletedTasks(!showCompletedTasks)}>
                            <HStack className='items-center justify-between p-2'>
                                <Text className="text-lg font-bold">Completed Tasks</Text>
                                <Icon className='text-black' as={showCompletedTasks ? ChevronUpIcon : ChevronDownIcon} size='lg' />
                            </HStack>
                        </Pressable>

                        {showCompletedTasks && (
                            <VStack className='mt-2 space-y-4'>
                                {completedTasks.map((task) => (
                                    <Pressable key={task.id}>
                                        <HStack className='items-center gap-4 p-2'>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className='w-10 h-10 rounded-full'
                                                onPress={() => handleTaskCompletion(task)}
                                            >
                                                <ButtonIcon
                                                    as={task.completed ? CheckIcon : Icon}
                                                    className='text-blue-500'
                                                />
                                            </Button>
                                            <VStack>
                                                <Text className="text-lg font-bold">{task.title}</Text>
                                                <Text className={`text-sm ${task.late ? "text-red-500" : "text-blue-500"}`}>
                                                    {task.late ? "Finished late" : "Finished on time"} - {formatDateTime(task.dueDate)}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </Pressable>
                                ))}
                            </VStack>
                        )}
                    </Box>
                )}
            </ScrollView>
            <Fab
                className="absolute bottom-10 right-10"
                size="lg"
                onPress={() => router.push('/task/new')}
            >
                <FabIcon as={AddIcon} />
            </Fab>
        </SafeAreaView>
    );
}