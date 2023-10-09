import React from "react";
import {tryFetchData} from "../utils/apiHelper.js";

const RANDOM_FACT_API_URL = "https://api.api-ninjas.com/v1/facts?limit=1"

export default function TestCountdown(props) {
    const [countdownTimeInSeconds, setCountdownTimeInSeconds] = React.useState(10)
    const [funFact, setFunFact] = React.useState("");

    React.useEffect(() => {
        const apiKey = "JZDgzZNFXjQ2o7glprpbPg==kRpmEoxXi5UALX0e"
        const options = {
            method: 'GET',
            headers: {'X-Api-Key': apiKey}
        }
        tryFetchData(RANDOM_FACT_API_URL, options).then((data) => {
            setFunFact(data[0].fact)
        })
    }, []);

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
            <h2 className="countdown-text">Recall begins in {countdownTimeInSeconds} seconds</h2>
            <p className="fun-fact-text">Did you know ... {funFact}</p>
            <button className="skip-button" onClick={props.handleTestCountdown}>Skip</button>
        </div>
    );
}