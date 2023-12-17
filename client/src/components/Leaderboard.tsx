import React from 'react'

interface HighScore {
    Name: string
    score: number
}

interface LeaderboardProps {
    toggleHighScores: () => void
    userScore: number
}

const fakeHighScores: HighScore[] = [
    { Name: 'Thi', score: 9 },
    { Name: 'Tamer', score: 8 },
    { Name: 'boggie Man', score: 7 },
    { Name: 'phill', score: 6 },
]

export default function Leaderboard(props: LeaderboardProps) {
    const [playerName, setPlayerName] = React.useState('')

    const handleScoreSubmit = () => {
        // Store name and props.userScore in the database once implemented
        // console.log(playerName)
        props.toggleHighScores()
    }

    const playerNamesAndScores = fakeHighScores.map((player, index) => (
        <tr key={index}>
            <td>{player.Name}</td>
            <td>{player.score}</td>
        </tr>
    ))

    return (
        <div className="instructions-card-overlay">
            <div className="instructions-card">
                <button
                    className="instructions-close-button"
                    onClick={props.toggleHighScores}
                >
                    Close
                </button>
                <h2>HIGH SCORES</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>{playerNamesAndScores}</tbody>
                </table>
                <div>
                    <label>
                        <input
                            type="text"
                            size={9}
                            placeholder="Enter Name"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                        />
                    </label>
                    <span>{props.userScore}</span>
                    <p></p>
                    <button type="submit" onClick={handleScoreSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}