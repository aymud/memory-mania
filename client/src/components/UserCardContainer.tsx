import { ReactNode } from 'react';

import styled from 'styled-components';

const StyledUserCardsContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    padding: 20px;
    border: 2px solid white;
`;

interface UserCardContainerProps {
    children: ReactNode;
}

export default function UserCardContainer(props: UserCardContainerProps) {
    return <StyledUserCardsContainer>{props.children}</StyledUserCardsContainer>;
}
