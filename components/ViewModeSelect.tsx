import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@/components/ui/select';
import { ChevronDownIcon, Icon, StarIcon } from '@/components/ui/icon';
import { Text } from './ui/text';

const VIEW_OPTIONS = [
    { value: '1', label: 'Tasks for today!', icon: StarIcon },
    { value: '2', label: 'Tasks for the week!', icon: StarIcon },
    { value: '3', label: 'Highest priority', icon: StarIcon },
];

export const ViewModeSelect = ({ onViewModeChange }: { onViewModeChange: (value: string) => void }) => (
    <Select onValueChange={onViewModeChange} defaultValue={VIEW_OPTIONS[0].label}>
        <SelectTrigger className='h-14' variant="underlined" size="lg">
            <SelectInput className='text-2xl font-bold' />
            <SelectIcon as={ChevronDownIcon} className='mx-2' size='lg' />
        </SelectTrigger>

        <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
                <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                </SelectDragIndicatorWrapper>

                {VIEW_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value} label={option.label}>
                        <Text className='text-black'>{option.label}</Text>
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectPortal>
    </Select>
);