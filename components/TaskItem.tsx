import { CheckIcon, CircleIcon } from '@/components/ui/icon';
import { Task } from '@/types/task';
import { router } from 'expo-router';
import { Pressable } from './ui/pressable';
import { HStack } from './ui/hstack';
import { Button, ButtonIcon } from './ui/button';
import { VStack } from './ui/vstack';
import { Text } from './ui/text';

export const TaskItem = ({
    task,
    onToggle
}: {
    task: Task;
    onToggle: () => void;
}) => (
    <Pressable
        onPress={() => router.push({
            pathname: '/task/[id]/index.',
            params: { id: task.id }
        })}
        accessibilityLabel={`Task: ${task.title}`}
    >
        <HStack className='space-4 align-middle'>
            <Button
                variant="outline"
                className='w-40 h-40 radius-full'
                size="lg"
                onPress={onToggle}
                accessibilityLabel={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
                <ButtonIcon as={task.completed ? CheckIcon : CircleIcon} color="$blue500" />
            </Button>

            <VStack className='flex-1'>
                <Text className='text-lg font-bold'>{task.title}</Text>
                {task.description && (
                    <Text className='text-sm text-gray-500'>{task.description}</Text>
                )}
                {task.dueDate && (
                    <Text className={`text-sm ${task.late ? "text-red-500" : "text-blue-500"}`}>
                        {task.late ? 'Finished late' : task.dueDate}
                    </Text>
                )}
            </VStack>
        </HStack>
    </Pressable>
);