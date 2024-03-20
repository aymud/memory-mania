import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import UserCard from './UserCard.tsx';
import { IUserCard } from '../types.ts';

export default function SortableUserCard(props: IUserCard) {
    const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined
    };

    return (
        <UserCard ref={setNodeRef} style={style} withOpacity={isDragging} {...props} {...attributes} {...listeners} />
    );
}
