import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@/components/ui/select';
import { ChevronDownIcon, Icon, StarIcon } from '@/components/ui/icon';
import { HStack } from './ui/hstack';
import { Text } from './ui/text';

const SORT_OPTIONS = [
    { value: '1', label: 'Priority', icon: StarIcon },
    { value: '2', label: 'Due Date', icon: StarIcon },
    { value: '3', label: 'Oldest First', icon: StarIcon },
    { value: '4', label: 'Newest First', icon: StarIcon }
];

export const SortSelect = ({ onSortChange }: { onSortChange: (value: string) => void }) => (
    <Select onValueChange={onSortChange}>
        <SelectTrigger variant="underlined" size="lg">
            <SelectInput placeholder="Order by:" />
            <SelectIcon as={ChevronDownIcon} />
        </SelectTrigger>

        <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
                <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                </SelectDragIndicatorWrapper>

                {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value} label={option.label}>
                        <HStack space="md" className='align-items-center'>
                            <Icon className='text-black' as={option.icon} size="sm" color="$blue500" />
                            <Text className='text-black'>{option.label}</Text>
                        </HStack>
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectPortal>
    </Select>
);