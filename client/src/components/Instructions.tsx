import styled from "styled-components";

const InstructionsModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; /*  Ensure overlay appears on top of other elements on the page. */
`;

const Card = styled.div`
  background-color: white;
  padding: 20px;
  max-width: 80%;
  border-radius: 8px;
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.0rem;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
`

export default function Instructions(props) {
    return (
        <InstructionsModal>
            <Card>
                <CloseButton onClick={props.OnToggle}>
                    Close
                </CloseButton>
                <h2>Game Instructions</h2>
                <p>Look at each person and try to memorize their name.</p>
                <p>When ready, start the test. There will be a short waiting period before recall begins.</p>
                <p>When the test starts, click the input box below the photo and type the name.</p>
                <p><b>Note</b>: Spelling counts, but not case sensitivity.</p>
            </Card>
        </InstructionsModal>
    )
}