import styled from 'styled-components';

export const ThemedAppContainer = styled.div`
    margin: 0;
    background-color: ${props => props.theme.backgroundColor};
    height: 100vh;
`;
