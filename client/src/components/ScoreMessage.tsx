import styled from 'styled-components';

const ScoreContainer = styled.div`
    text-align: center;
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const ScoreText = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: #333;
`;

interface ScoreMessageProps {
    correctAnswersCount: number;
    totalUsers: number;
    level: number;
}

export default function ScoreMessage(props: ScoreMessageProps) {
    const message = `${props.correctAnswersCount} / ${props.totalUsers}`;
    return (
        <ScoreContainer>
            <ScoreText data-testid='cypress-score-text'>{message}</ScoreText>
        </ScoreContainer>
    );
}
