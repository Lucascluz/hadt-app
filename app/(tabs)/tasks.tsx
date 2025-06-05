import { Box } from '@/components/ui/box';
import { Button, ButtonIcon } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { AddIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { VStack } from '@/components/ui/vstack';
import { getAllTasks, updateTask } from '@/db/taskService';
import { Task } from '@/types/task';
import { List } from '@/types/list';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { getAllLists } from '@/db/listService';
import { Fab, FabIcon } from '@/components/ui/fab';

export default function Tab() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [lists, setLists] = useState<List[]>([]);

  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [showPendingTasks, setShowPendingTasks] = useState(true);
  const database = useSQLiteContext();

  // Derive task states from the main tasks array
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const selectedListCompletedTasks = selectedList ? tasks.filter(task => task.completed && task.list === selectedList) : tasks.filter(task => task.completed);
  const selectedListPendingTasks = selectedList ? tasks.filter(task => !task.completed && task.list === selectedList) : tasks.filter(task => !task.completed);

  useFocusEffect(
    useCallback(() => {
      const fetchTasks = async () => {
        const allTasks = await getAllTasks(database);
        setTasks(allTasks);
      };
      const fetchLists = async () => {
        const allLists = await getAllLists(database); // Assuming you have a function to get lists
        setLists(allLists);
      };
      fetchTasks();
      fetchLists();

    }, [database]) // Include database in dependencies
  );

  const handleTaskCompletion = async (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await updateTask(database, updatedTask);
    setTasks(prevTasks =>
      prevTasks.map(t => t.id === task.id ? updatedTask : t)
    );
  };

  return (
    <SafeAreaView className='flex-1'>
      <View className='justify-center items-center pt-4'>
        <Text className="text-3xl font-bold">Tasks</Text>
      </View>
      <View>

        <ScrollView horizontal snapToAlignment='start' decelerationRate='fast'>
          <HStack className='justify-between space-x-4 w-full'>
            <Pressable className={`p-4 px-8 ${!selectedList && "bg-gray-200"} rounded-xl`} onPress={() => setSelectedList(null)}>
              <HStack className='items-center justify-center'>
                <Text className="text-lg font-bold"> All tasks </Text>
              </HStack>
            </Pressable>
            {lists.map((list) => (
              <Pressable className={`p-4 px-8 ${list.id === selectedList && "bg-gray-200"} rounded-xl`} key={list.id} onPress={() => setSelectedList(list.id)}>
                <View>
                  <Text className="text-lg font-bold">{list.name}</Text>
                </View>
              </Pressable>
            ))}
            <Pressable className={`p-4 px-8 `} onPress={() => router.push('/list/new')}>
              <HStack className='items-center justify-center'>
                <Icon as={AddIcon} size='lg' className='text-black' />
                <Text className="text-lg font-bold">New List</Text>
              </HStack>
            </Pressable>
          </HStack>
        </ScrollView>
      </View>

      <ScrollView className='w-full' decelerationRate={'fast'} snapToAlignment='center'>
        {/* Pending Tasks Section */}
        <Box className='bg-white m-4 p-4 rounded-xl shadow-md'>
          <Pressable onPress={() => setShowPendingTasks(!showPendingTasks)}>
            <HStack className='items-center justify-between p-2'>
              <Text className="text-lg font-bold">Pending Tasks</Text>
              <Icon className='text-black' as={showPendingTasks ? ChevronUpIcon : ChevronDownIcon} size='lg' />
            </HStack>
          </Pressable>

          {showPendingTasks && (
            <VStack className='mt-2 space-y-4'>
              {selectedListPendingTasks.map((task) => (
                <Pressable
                  key={task.id}
                  onPress={() => router.push({
                    pathname: '/task/[id]/index.',
                    params: { id: task.id }
                  })}
                  onLongPress={() => router.push({
                    pathname: '/list/[id]/index',
                    params: { id: task.id }
                  })}
                >
                  <HStack className='items-center gap-4'>
                    <Button
                      variant="outline"
                      size="sm"
                      className='w-10 h-10 rounded-full'
                      onPress={() => handleTaskCompletion(task)}
                    >
                      <ButtonIcon
                        as={task.completed ? CheckIcon : Icon}
                        className='text-blue-500'
                      />
                    </Button>
                    <VStack>
                      <Text className="text-lg font-bold">{task.title}</Text>
                      <Text className="text-sm text-gray-500">{task.description}</Text>
                      <Text className="text-sm text-gray-500">{task.dueDate}</Text>
                    </VStack>
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          )}
        </Box>

        {/* Completed Tasks Section */}
        {selectedListCompletedTasks.length > 0 && (
          <Box className='bg-white m-4 p-4 rounded-xl shadow-md'>
            <Pressable onPress={() => setShowCompletedTasks(!showCompletedTasks)}>
              <HStack className='items-center justify-between p-2'>
                <Text className="text-lg font-bold">Completed Tasks</Text>
                <Icon className='text-black' as={showCompletedTasks ? ChevronUpIcon : ChevronDownIcon} size='lg' />
              </HStack>
            </Pressable>

            {showCompletedTasks && (
              <VStack className='mt-2 space-y-4'>
                {selectedListCompletedTasks.map((task) => (
                  <Pressable key={task.id}>
                    <HStack className='items-center gap-4 p-2'>
                      <Button
                        variant="outline"
                        size="sm"
                        className='w-10 h-10 rounded-full'
                        onPress={() => handleTaskCompletion(task)}
                      >
                        <ButtonIcon
                          as={task.completed ? CheckIcon : Icon}
                          className='text-blue-500'
                        />
                      </Button>
                      <VStack>
                        <Text className="text-lg font-bold">{task.title}</Text>
                        <Text className={`text-sm ${task.late ? "text-red-500" : "text-blue-500"}`}>
                          {task.late ? "Finished late" : "Finished on time"}
                        </Text>
                      </VStack>
                    </HStack>
                  </Pressable>
                ))}
              </VStack>
            )}
          </Box>
        )}
      </ScrollView>
      <Fab
        className="absolute bottom-10 right-10"
        size="lg"
        onPress={() => router.push({
          pathname: '/task/new',
          params: { listid: selectedList }
        })}
      >
        <FabIcon as={AddIcon} />
      </Fab>
    </SafeAreaView>
  );
}

