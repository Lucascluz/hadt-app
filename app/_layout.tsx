import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {



  return (
    <GluestackUIProvider mode="dark">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/sign-out" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/home" options={{ title: 'Lists' }} />
      </Stack>
    </GluestackUIProvider>
  );
}

export default RootLayout
