import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import UserCard from './UserCard.tsx';
import { IUserCard } from '../types.ts';

export default function SortableUserCard(props: IUserCard) {
    const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

    const cardTransformStyle = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined
    };

    return (
        <UserCard
            ref={setNodeRef}
            cardTransformStyle={cardTransformStyle}
            {...props}
            withOpacity={isDragging}
            {...attributes}
            {...listeners}
        />
    );
}
