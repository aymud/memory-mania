import { useCallback, useState } from 'react';

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
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import Grid from './Grid.tsx';
import UserCard from './UserCard.tsx';

export default function DragDropUserCardContainer(props) {
    const [items, setItems] = useState(props.children);
    const [activeId, setActiveId] = useState<string | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(event.active.id);
    }, []);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems(items => {
                const oldIndex = items.findIndex(card => card.props.user.id.value === active.id);
                const newIndex = items.findIndex(card => card.props.user.id.value === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
        setActiveId(null);
    }, []);

    const handleDragCancel = useCallback(() => {
        setActiveId(null);
    }, []);

    const activeCardIndex = items.findIndex(card => card.key === activeId);
    let activeCardProps;
    if (activeCardIndex > -1 && items) {
        activeCardProps = items[activeCardIndex].props;
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}>
            <SortableContext items={items.map(el => el.key)} strategy={rectSortingStrategy}>
                <Grid columns={5}>{items}</Grid>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {activeId ? <UserCard id={activeId} isDragging {...activeCardProps} /> : null}
            </DragOverlay>
        </DndContext>
    );
}
