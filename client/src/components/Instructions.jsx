export default function Instructions(props) {
  return (
    <div
      className={`${
        props.isStartButtonClicked
          ? "start-button-clicked-Instructions-bg "
          : "instructions-card-overlay"
      }`}
    >
      <div className="instructions-card">
        {!props.isStartButtonClicked && (
          <button
            className="instructions-close-button"
            onClick={props.OnToggle}
          >
            Close
          </button>
        )}
        <h2>Game Instructions</h2>
        <p>Look at each person and try to memorize their name.</p>
        <p>
          When ready, start the test. There will be a short waiting period
          before recall begins.
        </p>
        <p>
          When the test starts, click the input box below the photo and type the
          name.
        </p>
        <p>
          <b>Note</b>: Spelling counts, but not case sensitivity.
        </p>
        {props.isStartButtonClicked && (
          <div className="ok-button">
            <button onClick={props.gameStart}>OK</button>
          </div>
        )}
      </div>
    </div>
  );
}
