import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { generateGoalPath } from '@/utils/huggingface-client';
import { createListFromGoalPath } from '@/db/listService';

export default function ListCreateModal() {

    const database = useSQLiteContext();

    const [goal, setGoal] = useState<string>("");

    const handleCallApi = async (goal: string) => {
        console.log("Goal:", goal);
        try {
            const goalPath = await generateGoalPath(goal);
            console.log("Generated Tasks:", goalPath.tasks);
            await createListFromGoalPath(database, goalPath).then(() => {
                console.log("List created successfully from goal path");
                router.back();
            }
            ).catch((error) => {
                console.error("Error creating list from goal path:", error);
            }
            );
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error:", error.message);
            } else {
                console.error("An unknown error occurred:", error);
            }
        }
    }

    return (
        <View className='flex-1 p-8'>
            <Box className='w-full p-4 bg-gray-200 rounded-xl shadow-md'>

                <Textarea className='bg-white w-full mb-4' size="lg">
                    <TextareaInput
                        className='text-black'
                        style={{ color: 'black' }}
                        placeholder='Goal'
                        onChange={(e) => setGoal(e.nativeEvent.text)}
                    />
                </Textarea>

                <Button className='bg-blue-500 my-4' size='lg' onPress={() => handleCallApi(goal)}>
                    <ButtonText className='text-white'>Generate goal path</ButtonText>
                </Button>
            </Box>
        </View>
    );
}


