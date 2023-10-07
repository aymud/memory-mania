import React from "react";

export default function TestCountdown(props) {
    const [countdownTimeInSeconds, setCountdownTimeInSeconds] = React.useState(10)
    const [funFact, setFunFact] = React.useState("");

    React.useEffect(() => {
        const apiKey = "JZDgzZNFXjQ2o7glprpbPg==kRpmEoxXi5UALX0e"
        fetch('https://api.api-ninjas.com/v1/facts?limit=1', {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setFunFact(data[0].fact);
            })
            .catch((error) => {
                console.error("Error fetching fact:", error);
            });
    }, []);

    // Start the countdownTimeInSeconds timer
    React.useEffect(() => {
        const timerIntervalInMilliSeconds = 1000
        const timer = setInterval(() => {
            if (countdownTimeInSeconds > 0) {
                setCountdownTimeInSeconds(prevCountdownTime => prevCountdownTime - 1);
            } else {
                clearInterval(timer);
                props.handleTestCountdown(); // Notify the parent component that the rest phase is complete.
            }
        }, timerIntervalInMilliSeconds);

        return () => {
            clearInterval(timer);
        };
    }, [countdownTimeInSeconds]);

    return (
        <div className="test-countdown-container">
            <h2>Rest Phase</h2>
            <p className="countdown-text">Time remaining: {countdownTimeInSeconds} seconds</p>
            <p className="fun-fact-text">Did you know ... {funFact}</p>
            <button className="skip-button" onClick={props.handleTestCountdown}>Skip</button>
        </div>
    );
}