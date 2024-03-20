import React, { FC, useCallback, useState } from 'react';

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
import SortableItem from './SortableItem';
import Item from './Item';

const mockUser = {
    name: {
        first: 'John'
    },
    picture: {
        large: 'image.jpg'
    },
    id: {
        value: '123'
    }
};
const mockUser2 = {
    name: {
        first: 'John'
    },
    picture: {
        large: 'image.jpg'
    },
    id: {
        value: '12345'
    }
};

const mockAllUserNames = ['John', 'Jane', 'Doe'];

const DragDropUserCardContainer: FC = props => {
    const [items, setItems] = useState(props.children);
    // console.log(items.map(el => el.key));
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

                // const oldIndex = items.indexOf(active.id);
                // const newIndex = items.indexOf(over!.id);

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
            <SortableContext items={items.map(el => el.key)} strategy={rectSortingStrategy}>
                <Grid columns={5}>
                    {items.map(card => (
                        <SortableItem key={card.props.user.id.value} id={card.props.user.id.value} />
                    ))}
                </Grid>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {activeId ? <Item id={activeId} isDragging /> : null}
            </DragOverlay>
        </DndContext>
    );
};

export default DragDropUserCardContainer;
