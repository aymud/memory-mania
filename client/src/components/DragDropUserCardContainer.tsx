import React, { ReactElement, ReactNode, useState } from 'react';

import styled from 'styled-components';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

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

interface IDragEndResult {
    source: {
        index: number;
    };
    destination: {
        index: number;
    } | null;
}

export default function DragDropUserCardContainer(props: UserCardContainerProps) {
    const [cards, setCards] = useState<ReactElement[]>(React.Children.toArray(props.children) as ReactElement[]);

    const handleDragEnd = (result: IDragEndResult) => {
        if (!result.destination) return;

        const updatedCards = Array.from(cards);
        const [reorderedCard] = updatedCards.splice(result.source.index, 1);
        updatedCards.splice(result.destination.index, 0, reorderedCard);

        setCards(updatedCards);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId='cards' direction='horizontal'>
                {provided => (
                    <StyledUserCardsContainer {...provided.droppableProps} ref={provided.innerRef}>
                        {cards.map((card: ReactElement, index: number) => (
                            <Draggable
                                key={card.props.user.id.value}
                                draggableId={card.props.user.id.value}
                                index={index}>
                                {provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        {card}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </StyledUserCardsContainer>
                )}
            </Droppable>
        </DragDropContext>
    );
}
