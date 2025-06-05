import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import React from 'react';
import { Stack } from 'expo-router';
import { SQLiteProvider } from "expo-sqlite";
import { dropDatabase, initDatabase } from "@/db/databaseService";
import { Platform } from "react-native";

const StackNavigator = () => (
  <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="task/new" options={{ headerShown: false }} />
    <Stack.Screen name="task/[id]/index" options={{
      headerShown: false,
      animation: 'fade_from_bottom',
    }} />
    <Stack.Screen name="list/new" options={{ headerShown: false }} />
    <Stack.Screen name="list/generate" options={{
      headerShown: false,
    }} />
    <Stack.Screen name="list/[id]/index" options={{
      headerShown: false,
      animation: 'fade_from_bottom',
    }} />
  </Stack>
);

const RootLayout = () => {
  const isWeb = Platform.OS === 'web';

  if (isWeb) {
    // Skip SQLiteProvider on web
    return (
      <GluestackUIProvider mode="light">
        <StackNavigator />
      </GluestackUIProvider>
    );
  }

  return (
    <SQLiteProvider databaseName="hadt.db" onInit={initDatabase}>
      <GluestackUIProvider mode="light">
        <StackNavigator />
      </GluestackUIProvider>
    </SQLiteProvider>
  );
};

export default RootLayout;
