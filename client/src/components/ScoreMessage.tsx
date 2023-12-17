import styled from 'styled-components'

const ScoreContainer = styled.div`
    text-align: center;
    margin-top: 20px;
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
`

const ScoreText = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: #333;
`

interface ScoreMessageProps {
    correctAnswersCount: number
    totalUsers: number
    level: number
}

export default function ScoreMessage(props: ScoreMessageProps) {
    const message = `You got ${props.correctAnswersCount} 
                            ${
                                props.correctAnswersCount > 1 ||
                                props.correctAnswersCount === 0
                                    ? 'names'
                                    : 'name'
                            } 
                             correct out of ${props.totalUsers} on level ${
                                 props.level
                             }.`
    return (
        <ScoreContainer>
            <ScoreText> {message} </ScoreText>
        </ScoreContainer>
    )
}
