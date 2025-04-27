import { ChevronDownIcon, ChevronUpIcon } from '@/components/ui/icon';
import { ReactNode } from 'react';
import { Box } from './ui/box';
import { Pressable } from './ui/pressable';
import { HStack } from './ui/hstack';
import { Text } from './ui/text';
import { VStack } from './ui/vstack';

export const TaskSection = ({
  title,
  children,
  showContent,
  onToggle
}: {
  title: string;
  children: ReactNode;
  showContent: boolean;
  onToggle: () => void;
}) => (
  <Box className="border-b border-gray-200">
    <Pressable onPress={onToggle}>
      <HStack className="justify-between p-2" space="md">
        <Text className='text-lg font-bold'>{title}</Text>
        <Text>
          {showContent ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Text>
      </HStack>
    </Pressable>

    {showContent && (
      <VStack className="overflow-hidden p-2 space-2">
        {children}
      </VStack>
    )}
  </Box>
);