import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default StyledButton;