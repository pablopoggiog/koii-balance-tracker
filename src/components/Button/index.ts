import styled from "styled-components";

interface ButtonProps {
  disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
  border-radius: 0.5em;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: 0.6s;
  display: flex;
  text-align: center;
  justify-content: center;
  background: white;
  color: black;
  box-sizing: border-box;
  padding: 0.25em 0.5em;
  &:focus {
    outline: 0;
  }
`;
