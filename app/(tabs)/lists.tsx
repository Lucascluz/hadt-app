import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'

const Lists = () => {
  return (
    <SafeAreaView>
      <View className="bg-background h-16 w-full flex-row items-center justify-between px-4 bg-gray-300">
        <Text className="text-3xl font-bold">Lists</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="bg-background h-16 w-full flex-row items-center justify-between px-4 bg-gray-300 mt-2">
        <VStack className="bg-background V-16 w-full flex-row items-center justify-between px-4 bg-gray-300 mt-2">
          <Text className="text-xl font-bold">List 1</Text>
        </VStack>
        <VStack className="bg-background V-16 w-full flex-row items-center justify-between px-4 bg-gray-300 mt-2">
          <Text className="text-xl font-bold">List 2</Text>
        </VStack>
        <VStack className="bg-background V-16 w-full flex-row items-center justify-between px-4 bg-gray-300 mt-2">
          <Text className="text-xl font-bold">List 3</Text>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Lists