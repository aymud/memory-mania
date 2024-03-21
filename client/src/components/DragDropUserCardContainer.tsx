import React, { useCallback, useState } from 'react';

import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    MouseSensor,
    TouchSensor,
    UniqueIdentifier,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import Grid from './Grid.tsx';
import UserCard from './UserCard.tsx';
import { IUserCard } from '../types.ts';

interface DragDropUserCardContainerProps {
    children: React.ReactElement<IUserCard>[];
}

export default function DragDropUserCardContainer(props: DragDropUserCardContainerProps) {
    const [userCards, setUserCards] = useState(props.children);
    const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    // Used for the drag overlay.
    const draggedCardIndex = userCards.findIndex(card => card.key === draggedCardId);
    let activeCardProps: IUserCard | undefined;
    if (draggedCardIndex > -1 && userCards) {
        activeCardProps = userCards[draggedCardIndex].props;
    }

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setDraggedCardId(String(event.active.id));
    }, []);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setUserCards(items => {
                const oldIndex = items.findIndex(card => card.props.user.id.value === active.id);
                const newIndex = items.findIndex(card => card.props.user.id.value === over!.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
        setDraggedCardId(null);
    }, []);

    const handleDragCancel = useCallback(() => {
        setDraggedCardId(null);
    }, []);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}>
            <SortableContext items={userCards.map(card => card.key as UniqueIdentifier)} strategy={rectSortingStrategy}>
                <Grid numOfColumns={5}>{userCards}</Grid>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {draggedCardId && activeCardProps ? <UserCard {...activeCardProps} isDragging /> : null}
            </DragOverlay>
        </DndContext>
    );
}
