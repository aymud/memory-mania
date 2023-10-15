import React from "react";

export default function HighScores(props){

    const [name, setName] = React.useState("");

    //This will be used untill a database can be utilized
    //another function will be called later to fill in the details 
    const fakeHighscoreList = [
        { Name: "Thi", score: 9},
        { Name: "Tamer", score: 8},
        { Name: "boggie Man", score: 7},
        { Name: "phill", score: 6}
    ]
    //store name and props.userScore into database once implemented
    function handleScoreSubmit(){
        console.log(name)
        props.onToggle()
    }

    function closeScreen(){
        props.onToggle()
    }
    const highscoreList = fakeHighscoreList.map(fakeHighscoreList => 
        <tr>
            <td>{fakeHighscoreList.Name}</td>
            <td>{fakeHighscoreList.score}</td>
        </tr>
        );
    
    const userScore = 
    
    <div>
    <label>
      <input 
        type="text" 
        size = "9"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </label>
    <text> 
           .  {props.userScore}
    </text>
    <p></p>
    <button type = 'Submit' onClick={handleScoreSubmit}>submit</button>
    </div>
  
  
    

    return(
        <div className="instructions-card-overlay">
        <div className="instructions-card">
            <button className="instructions-close-button" onClick={closeScreen}>
                Close
            </button>
            <h2>HIGH SCORES</h2>
            <table>
            <tr>
                <th>Name</th>
                <th>Score</th>
            </tr>
            {highscoreList}
            </table>
            {userScore}
        </div>
    </div>
    )
}