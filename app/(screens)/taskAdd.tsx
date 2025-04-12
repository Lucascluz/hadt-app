import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Input, InputField } from '@/components/ui/input'
import { Textarea, TextareaInput } from '@/components/ui/textarea'

const TaskAddScreen = () => {

  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [isCompleted, setIsCompleted] = React.useState(false)

  return (
    <SafeAreaView className='bg-black'>
      <View className="bg-background h-16 w-full flex-row items-center justify-between px-4 bg-gray-300">
        <Text className="text-3xl font-bold">TaskAddScreen Task</Text>
      </View>

      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
      >
        <InputField
          className='color-black'
          placeholder="Title" />
      </Input>

      <Textarea>
        <TextareaInput
          className='bg-red-500'
          placeholder='Description'
        />
      </Textarea>



    </SafeAreaView>
  )
}

export default TaskAddScreen