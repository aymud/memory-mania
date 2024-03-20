import { ReactElement } from 'react';

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

interface IDragEndResult {
    source: {
        index: number;
    };
    destination: {
        index: number;
    } | null;
}

interface UserCardContainerProps {
    cards: ReactElement[];
    handleDragEnd: (result: IDragEndResult) => void;
}

export default function DragDropUserCardContainer(props: UserCardContainerProps) {
    return (
        <DragDropContext onDragEnd={props.handleDragEnd}>
            <Droppable droppableId='cards' direction='horizontal'>
                {provided => (
                    <StyledUserCardsContainer {...provided.droppableProps} ref={provided.innerRef}>
                        {props.cards.map((card: ReactElement, index: number) => (
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
