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

interface ISortableCard {
    id: string;
    allUserNames: string[];
    handleOnChange: (name: string, id: string) => void;
    user: User;
    isLevelOver: boolean;
    isLearning: boolean;
}

export default function SortableUserCard(props: ISortableCard) {
    const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined
    };

    return (
        <UserCard ref={setNodeRef} style={style} withOpacity={isDragging} {...props} {...attributes} {...listeners} />
    );
}
