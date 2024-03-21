import { ReactNode } from 'react';

import styled from 'styled-components';

type GridProps = {
    children: ReactNode;
    numOfColumns: number;
};

const GridContainer = styled.div<{ $numOfColumns: number }>`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.$numOfColumns}, 1fr)`};
    grid-gap: 10px;
    max-width: 800px;
    margin: 100px auto;
`;

export default function Grid(props: GridProps) {
    return <GridContainer $numOfColumns={props.numOfColumns}>{props.children}</GridContainer>;
}
