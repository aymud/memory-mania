import { ReactNode } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import UserCard from './UserCard.tsx';

interface User {
    name: {
        first: string;
    };
    picture: {
        large: string;
    };
    id: {
        value: string;
    };
}

interface SortableCardProps {
    id: string;
    children?: ReactNode;
    user: User;
    allUserNames: string[];
    handleOnChange: (name: string, id: string) => void;
    isLevelOver: boolean;
    isLearning: boolean;
}

const SortableCard = (props: SortableCardProps) => {
    const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined
    };

    return <UserCard ref={setNodeRef} withOpacity={isDragging} {...props} {...attributes} {...listeners} />;
};

export default SortableCard;
