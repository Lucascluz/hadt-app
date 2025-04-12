import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const Dash = () => {
  return (
    <SafeAreaView>

      <View className="bg-background h-16 w-full flex-row items-center justify-between px-4 bg-gray-300">
        <Text className="text-3xl font-bold">Dash</Text>
      </View>

    </SafeAreaView>
  )
}

export default Dash