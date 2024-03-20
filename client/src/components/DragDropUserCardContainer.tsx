import React, { ReactElement, ReactNode, useCallback, useState } from 'react';

import styled from 'styled-components';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import Grid from './Grid.tsx';
import SortableCard from './SortableCard.tsx';

const StyledUserCardsContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    padding: 20px;
`;

interface UserCardContainerProps {
    children: ReactNode;
}

export default function DragDropUserCardContainer(props: UserCardContainerProps) {
    const [cards, setCards] = useState<ReactElement[]>(React.Children.toArray(props.children) as ReactElement[]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(event.active.id);
    }, []);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setCards(items => {
                const newItems = [...items];
                const oldIndex = newItems.findIndex(card => card.key === active.id);
                const newIndex = newItems.findIndex(card => card.key === over?.id);

                if (oldIndex !== -1 && newIndex !== -1) {
                    const [removed] = newItems.splice(oldIndex, 1);
                    newItems.splice(newIndex, 0, removed);
                }

                return newItems;
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
            <SortableContext items={cards} strategy={rectSortingStrategy}>
                <Grid columns={5}>{cards.map((card, index) => card)}</Grid>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {activeId ? <SortableCard key={activeId} id={activeId} isDragging /> : null}
            </DragOverlay>
        </DndContext>
    );
}
