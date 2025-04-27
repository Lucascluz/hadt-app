import { format, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

export function formatDateTime(dateString: string | undefined): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();

    const diffDays = differenceInDays(date, now);
    const diffHours = differenceInHours(date, now);
    const diffMinutes = differenceInMinutes(date, now);

    if (diffDays === 0) {
        if (diffHours < 12) {
            return diffHours > 0 ? `in ${diffHours} hours` : diffMinutes > 0 ? `in ${diffMinutes} minutes` : 'now';
        }
        return `Today at ${format(date, 'HH:mm')}`;
    } else if (diffDays === 1) {
        return `Tomorrow at ${format(date, 'HH:mm')}`;
    } else if (diffDays === -1) {
        return `Yesterday at ${format(date, 'HH:mm')}`;
    } else if (diffDays > 1 && diffDays <= 5) {
        return `in ${diffDays} days`;
    } else if (diffDays < -1 && diffDays >= -5) {
        return `${Math.abs(diffDays)} days ago`;
    }

    return format(date, 'dd/MM HH:mm');
}