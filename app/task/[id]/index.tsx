import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { CalendarDaysIcon, CheckIcon, ChevronDownIcon, ClockIcon, CloseIcon, TrashIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '@/components/ui/select';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { deleteTask, getTaskById, updateTask } from '@/db/taskService';
import { Text } from "@/components/ui/text"
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import uuid from 'react-native-uuid';
import { useSQLiteContext } from 'expo-sqlite';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Task } from '@/types/task';
import { AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { getAllLists } from '@/db/listService';
import { List } from '@/types/list';

export default function TaskManageModal() {

    const { id } = useLocalSearchParams() as { id: string };

    const [task, setTask] = useState<Task | null>(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [list, setList] = useState('');

    const [lists, setLists] = useState<List[]>([]);
    const [currentListName, setCurrentListName] = useState('');

    // State cleanup
    const [dueDate, setDueDate] = useState<Date | string>('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const database = useSQLiteContext();

    useFocusEffect(
        useCallback(() => {
            const fetchTask = async () => {
                if (id) {
                    const task = await getTaskById(database, id);
                    if (task) {
                        setTask(task);
                        setTitle(task.title);
                        setDescription(task.description);
                        setCompleted(task.completed);
                        setList(task.list || '');
                        setDueDate(task.dueDate ? new Date(task.dueDate) : '');
                    }
                };
            };

            const fetchLists = async () => {
                // Fetch lists from the database if needed
                const fetchedLists = await getAllLists(database);
                if (fetchedLists) {
                    setLists(fetchedLists);
                    setCurrentListName(fetchedLists.filter((l) => l.id === list).map((l) => l.name)[0]);
                }
            };

            fetchLists()
            fetchTask();
        }, [database]) // Include database in dependencies
    );

    // Creating the task
    const handleUpdateTask = () => {
        if (!title || !description || !list) {
            console.error("Please fill in all fields.");
            return;
        }

        updateTask(database, {
            id: task?.id || uuid.v4().toString(),
            title,
            description,
            completed,
            list,
            dueDate: dueDate instanceof Date ? dueDate.toISOString() : dueDate,
            updatedAt: new Date().toISOString(),
        })
            .then(() => {
                console.log(`Task ${task?.id} updated successfully!`);
                router.back();
            })
            .catch((error) => {
                console.error("Error creating task: ", error);
            });
    };

    const handleDeleteTask = () => {
        if (task) {
            console.log("Deleting task with id: ", task.id);
            deleteTask(database, task).then(() => {
                console.log("Task deleted successfully!");
                router.back();
            }).catch((error) => {
                console.error("Error deleting task: ", error);
            });
        }
    }

    return (
        <View className='flex-1 p-8'>

            <Select defaultValue={currentListName} onValueChange={(value) => setList(value)}>
                <SelectTrigger variant="underlined" size="lg">
                    <SelectInput placeholder={list && list.length > 0 ? currentListName : "Select list"} />
                    <SelectIcon as={ChevronDownIcon} />
                </SelectTrigger>

                <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                        <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>

                        {lists.map((list) => (
                            <SelectItem key={list.id} value={list.id} label={list.name}>
                                <HStack space="md" className='align-items-center'>
                                    <Text className='text-black'>{list.name}</Text>
                                </HStack>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectPortal>
            </Select>

            <Input
                className='my-4'
                size="xl"
                variant="underlined"
            >
                <InputField className='text-xl font-bold text-black' placeholder="Title" value={title} onChange={(e) => setTitle(e.nativeEvent.text)} />
            </Input>

            <Textarea className='my-4' size="lg">
                <TextareaInput
                    value={description}
                    className='text-black'
                    placeholder='Description'
                    onChange={(e) => setDescription(e.nativeEvent.text)}
                />
            </Textarea>

            <Button
                className='justify-between rounded-full bg-gray-300 my-4'
                size="md"
                onPress={() => setShowDatePicker(true)}
            >
                <ButtonIcon as={CalendarDaysIcon} />
                <ButtonText className='text-black'>
                    {dueDate ? dueDate.toLocaleString() : "Due Date"}
                </ButtonText>
                <ButtonIcon as={ClockIcon} />
            </Button>

            {showDatePicker && (
                <DateTimePicker

                    mode="date"
                    display="default"
                    value={dueDate instanceof Date ? dueDate : new Date()}
                    minimumDate={new Date()}
                    onChange={(event, selected) => {
                        setShowDatePicker(false);
                        if (event.type === "set" && selected) {
                            const current = new Date(selected);
                            const existing = dueDate || new Date();
                            if (existing instanceof Date) {
                                current.setHours(existing.getHours());
                            }
                            if (existing instanceof Date) {
                                current.setMinutes(existing.getMinutes());
                            }
                            setDueDate(current);
                            setShowTimePicker(true);
                        }
                    }}
                />
            )}

            {showTimePicker && (
                <DateTimePicker
                    mode="time"
                    display="default"
                    value={dueDate instanceof Date ? dueDate : new Date()}
                    onChange={(event, selected) => {
                        setShowTimePicker(false);
                        if (event.type === "set" && selected) {
                            const current = dueDate || new Date();
                            if (current instanceof Date) {
                                current.setHours(selected.getHours());
                            }
                            if (current instanceof Date) {
                                current.setMinutes(selected.getMinutes());
                            }
                            setDueDate(current);
                        }
                    }}
                />
            )}


            <Button
                className={`rounded-full w-full my-4 ${completed ? 'bg-green-500' : 'bg-red-500'}`}
                size="md"
                onPress={() => setCompleted(!completed)}
            >
                <ButtonIcon as={completed ? CheckIcon : CloseIcon} />
                <ButtonText className='text-black'>{completed ? "Completed" : "Not completed"}</ButtonText>
            </Button>


            <HStack className='justify-between'>

                <Button className='bg-blue-500 my-4' size='lg' onPress={handleUpdateTask}>
                    <ButtonIcon as={CheckIcon} />
                </Button>
                <Button className='bg-red-500 my-4' size='lg' onPress={() => setShowDeleteDialog(true)}>
                    <ButtonIcon as={TrashIcon} />
                </Button>
            </HStack>
            <AlertDialog isOpen={showDeleteDialog} size="md">
                <AlertDialogBackdrop />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Heading className="text-typography-950 font-semibold" size="md">
                            Are you sure you want to delete this task?
                        </Heading>
                    </AlertDialogHeader>
                    <AlertDialogBody className="mt-3 mb-4">
                        <Text size="sm">
                            Deleting the task will remove it permanently and cannot be undone.
                            Please confirm if you want to proceed.
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter className="">
                        <Button
                            variant="outline"
                            action="secondary"
                            onPress={() => setShowDeleteDialog(false)}
                            size="sm"
                        >
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                        <Button size="sm" onPress={handleDeleteTask}>
                            <ButtonText>Delete</ButtonText>
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </View>
    );
}


