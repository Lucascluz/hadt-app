import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { createList } from '@/db/listService'; // Assuming a service for creating lists
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import uuid from 'react-native-uuid';
import { useSQLiteContext } from 'expo-sqlite';

export default function ListCreateModal() {
    const database = useSQLiteContext();

    const [name, setName] = useState('');
    const [context, setContext] = useState('');

    useEffect(() => {
        console.log("Name: ", name);
        console.log("Context: ", context);
        console.log("Created At: ", new Date().toISOString());
    }, [name, context]);

    const handleCreateList = () => {
        if (!name || !context) {
            console.error("Please fill in all fields.");
            return;
        }

        createList(database, {
            id: uuid.v4(),
            name,
            context,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            synced: false,
            deleted: false,
        })
            .then(() => {
                console.log("List created successfully!");
                router.back();
            })
            .catch((error) => {
                console.error("Error creating list: ", error);
            });
    };

    const navigateToGeneratePage = () => {
        router.push('/list/generate');
    };

    return (
        <View className='flex-1 p-8'>
            <Box className='w-full p-4 bg-gray-200 rounded-xl shadow-md'>
                <Input
                    className='bg-white mb-4'
                    size="lg"
                >
                    <InputField className='text-black' placeholder="List Name" onChange={(e) => setName(e.nativeEvent.text)} />
                </Input>

                <Input
                    className='bg-white mb-4'
                    size="lg"
                >
                    <InputField className='text-black' placeholder="Context" onChange={(e) => setContext(e.nativeEvent.text)} />
                </Input>

                <Button className='bg-blue-500 my-4' size='lg' onPress={handleCreateList}>
                    <ButtonText className='text-white'>Create List</ButtonText>
                </Button>

                <Button className='bg-gray-500 my-4' size='lg' onPress={navigateToGeneratePage}>
                    <ButtonText className='text-white'>Generate List with A.I</ButtonText>
                </Button>
            </Box>
        </View>
    );
}


