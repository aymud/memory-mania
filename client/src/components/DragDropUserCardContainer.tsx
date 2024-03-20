import React, { CSSProperties, useCallback, useState } from 'react';

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
interface SortableUserCardProps {
    user: User;
    allUserNames: string[];
    handleOnChange: (name: string, id: string) => void;
    isLevelOver: boolean;
    isLearning: boolean;
    id: string;
    withOpacity?: boolean;
    isDragging?: boolean;
    style?: CSSProperties;
}

interface DragDropUserCardContainerProps {
    children: React.ReactElement<SortableUserCardProps>[];
}

export default function DragDropUserCardContainer(props: DragDropUserCardContainerProps) {
    const [userCards, setUserCards] = useState(props.children);
    const [activeId, setActiveId] = useState<string | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const activeCardIndex = userCards.findIndex(card => card.key === activeId);
    let activeCardProps = null;
    if (activeCardIndex > -1 && userCards) {
        activeCardProps = userCards[activeCardIndex].props;
    }

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(String(event.active.id));
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
        setActiveId(null);
    }, []);

    const handleDragCancel = useCallback(() => {
        setActiveId(null);
    }, []);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}>
            <SortableContext items={userCards.map(card => card.key as UniqueIdentifier)} strategy={rectSortingStrategy}>
                <Grid columns={5}>{userCards}</Grid>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {activeId ? <UserCard isDragging {...activeCardProps} /> : null}
            </DragOverlay>
        </DndContext>
    );
}
