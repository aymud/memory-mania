export default function ScoreMessage(props) {
    const message = `You got ${props.correctAnswersCount} 
                            ${props.correctAnswersCount > 1 || props.correctAnswersCount === 0 ? "names" : "name"} 
                             correct out of ${props.totalUsers} on level ${props.level}.`
    return (
        <div className="score-container">
            <p className="score-text">
                {message}
            </p>
        </div>
    );
}