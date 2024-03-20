import { ReactNode } from 'react';

import styled from 'styled-components';

type GridProps = {
    children: ReactNode;
    columns: number;
};

const GridContainer = styled.div<GridProps>`
    display: grid;
    grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
    grid-gap: 10px;
    max-width: 800px;
    margin: 100px auto;
`;

export default function Grid(props: GridProps) {
    return <GridContainer columns={props.columns}>{props.children}</GridContainer>;
}
