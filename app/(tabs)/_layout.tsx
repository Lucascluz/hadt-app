import { View, Text } from 'react-native'
import { Redirect, router, Tabs } from 'expo-router'
import React from 'react'
import { Icon, CircleIcon, MenuIcon, AddIcon } from "@/components/ui/icon"
import { Fab, FabIcon, FabLabel } from '@/components/ui/fab'

const TabsLayout = () => {
    return (
        <>
            <Fab
                className="absolute mb-10 bg-blue-500 hover:bg-blue-700"
                size="md"
                placement="bottom right"
                onPress={() => { router.push('./task/add') }}
                >
                <FabIcon className="color-white" as={AddIcon} />
            </Fab>
            <Tabs>
                <Tabs.Screen name="dash" options={{
                    title: 'Dash',
                    headerShown: false,
                    tabBarIcon: () => <Icon className="text-typography-500" as={CircleIcon} />,
                }} />
                <Tabs.Screen name="lists" options={{
                    title: 'Lists',
                    headerShown: false,

                    tabBarIcon: () => <Icon className="text-typography-500" as={MenuIcon} />,
                }} />
            </Tabs>
        </>
    )
}

export default TabsLayout