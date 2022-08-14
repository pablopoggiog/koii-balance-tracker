import styled, { keyframes, css } from "styled-components";

const ring = keyframes`
  0% {
    width: 30px;
    height: 30px;
    opacity: 1;
  }
  100% {
    width: 200px;
    height: 200px;
    opacity: 0;
  }
`;

interface ButtonProps {
  disabled?: boolean;
  outline?: boolean;
  noTheme?: boolean;
}

export const Button = styled.button<ButtonProps>`
  border-radius: 1em;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 1.2s;
  display: flex;
  text-align: center;
  justify-content: center;
  background: ${({ theme, noTheme }) =>
    noTheme
      ? "linear-gradient(90deg,rgba(129, 230, 217, 1) 0%,rgba(79, 209, 197, 1) 100%)"
      : theme.buttonBackground};
  color: ${({ theme }) => theme.text};
  box-sizing: border-box;
  padding: 1em;
  border: none;
  font-weight: bold;
  box-shadow: 12px 12px 24px ${({ theme }) => theme.buttonBoxOutline};
  outline: none;
  position: relative;
  text-transform: uppercase;
  font-size: 0.8em;

  @media (min-width: 768px) {
    font-size: 0.85em;
  }

  &:focus {
    outline: 0;
  }

  ${({ outline }) =>
    outline &&
    css`
      &::before {
        content: "";
        border-radius: 1000px;
        min-width: calc(300px + 12px);
        min-height: calc(60px + 12px);
        border: 6px solid ${({ theme }) => theme.buttonBoxOutline};
        box-shadow: 0 0 60px ${({ theme }) => theme.buttonBoxOutline};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: all 1.2s;
      }
    `}

  &:hover::before,
      &:focus::before {
    opacity: 1;
  }

  &::after {
    content: "";
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: 6px solid ${({ theme }) => theme.buttonBoxOutline};
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${ring} 1s ease 1;
    transition: all 1.2s;
  }

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.text};
    transform: translateY(-6px);
  }

  &:hover::after,
  &:focus::after {
    animation: none;
    display: none;
  }
`;
