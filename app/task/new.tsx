import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { CalendarDaysIcon, CheckIcon, ChevronDownIcon, ClockIcon, CloseIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '@/components/ui/select';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { createTask } from '@/db/taskService';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import uuid from 'react-native-uuid';
import { useSQLiteContext } from 'expo-sqlite';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TaskCreateModal() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [list, setList] = useState('');

    // State cleanup
    const [dueDate, setDueDate] = useState<Date | string>('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const database = useSQLiteContext();

    useEffect(() => {
        console.log("Title: ", title);
        console.log("Description: ", description);
        console.log("Completed: ", completed);
        console.log("Due Date: ", dueDate);
        console.log("List: ", list);
        console.log("Created At: ", new Date().toISOString());
    }
        , [title, description, completed, dueDate, list]);

    // Creating the task
    const handleCreateTask = () => {
        if (!title || !description || !list) {
            console.error("Please fill in all fields.");
            return;
        }

        createTask(database, {
            id: uuid.v4(),
            title,
            description,
            completed,
            dueDate: dueDate ? dueDate.toString() : '',
            list,
        })
            .then(() => {
                console.log("Task created successfully!");
                router.back();
            })
            .catch((error) => {
                console.error("Error creating task: ", error);
            });
    };

    return (
        <View className='flex-1 p-8'>
            <Box className='w-full p-4 bg-gray-200 rounded-xl shadow-md'>
                <Input
                    className='bg-white mb-4'
                    size="lg"
                >
                    <InputField className='text-black' placeholder="Title" onChange={(e) => setTitle(e.nativeEvent.text)} />
                </Input>

                <Textarea className='bg-white w-full mb-4' size="lg">
                    <TextareaInput
                        className='text-black'
                        style={{ color: 'black' }}
                        placeholder='Description'
                        onChange={(e) => setDescription(e.nativeEvent.text)}
                    />
                </Textarea>

                <Button
                    className='justify-between rounded-full bg-gray-300 mb-4'
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
                    className={`rounded-full w-full mb-4 ${completed ? 'bg-green-500' : 'bg-red-500'}`}
                    size="md"
                    onPress={() => setCompleted(!completed)}
                >
                    <ButtonIcon as={completed ? CheckIcon : CloseIcon} />
                    <ButtonText className='text-black'>Completed</ButtonText>
                </Button>

                <Select className='bg-white w-full mb-4' onValueChange={setList}>
                    <SelectTrigger className='justify-between' variant="outline" size="lg">
                        <SelectInput className='text-black' placeholder={list ? list : "Select a list"} />
                        <SelectIcon className="mr-3" as={ChevronDownIcon} />
                    </SelectTrigger>

                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent >
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem label="list1" value="list1" />
                            <SelectItem label="list2" value="list2" />
                            <SelectItem label="list3" value="list3" />
                            <SelectItem label="list4" value="list4" />
                            <SelectItem label="list5" value="list5" />
                        </SelectContent>
                    </SelectPortal>
                </Select>


                <Button className='bg-blue-500 my-4' size='lg' onPress={handleCreateTask}>
                    <ButtonText className='text-white'>Create Task</ButtonText>
                </Button>
            </Box>
        </View>
    );
}


