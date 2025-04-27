import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import React from 'react'
import { Stack } from 'expo-router'
import { SQLiteProvider } from "expo-sqlite";
import { dropDatabase, initDatabase } from "@/db/databaseService";

const RootLayout = () => {

  return (

    <SQLiteProvider databaseName="hadt.db" onInit={initDatabase}>
      <GluestackUIProvider mode="light">
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="task/new" options={{ headerShown: false }} />
          <Stack.Screen name="task/[id]/index." options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }} />
        </Stack>
      </GluestackUIProvider>
    </SQLiteProvider>

  );
}

export default RootLayout
