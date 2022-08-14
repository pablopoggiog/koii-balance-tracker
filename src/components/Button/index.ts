import styled, { keyframes, css } from "styled-components";

const ring = keyframes`
  0% {
    width: 30px;
    height: 30px;
    opacity: 1;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
`;

interface ButtonProps {
  disabled?: boolean;
  ringAnimation?: boolean;
}

export const Button = styled.button<ButtonProps>`
  border-radius: 1em;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: 0.6s;
  display: flex;
  text-align: center;
  justify-content: center;
  background: linear-gradient(
    90deg,
    rgba(129, 230, 217, 1) 0%,
    rgba(79, 209, 197, 1) 100%
  );
  color: black;
  box-sizing: border-box;
  padding: 1em;
  border: none;
  font-weight: bold;

  box-shadow: 12px 12px 24px rgba(79, 209, 197, 0.64);
  transition: all 0.3s ease-in-out 0s;
  outline: none;
  position: relative;
  text-transform: uppercase;

  &:focus {
    outline: 0;
  }

  &::before {
    content: "";
    border-radius: 1000px;
    min-width: calc(300px + 12px);
    min-height: calc(60px + 12px);
    border: 6px solid #00ffcb;
    box-shadow: 0 0 60px rgba(0, 255, 203, 0.64);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.3s ease-in-out 0s;
  }
  ${({ ringAnimation }) =>
    ringAnimation &&
    css`
      &:hover::before,
      &:focus::before {
        opacity: 1;
      }
    `}

  &:hover,
      &:focus {
    color: #313133;
    transform: translateY(-6px);
  }

  &::after {
    content: "";
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: 6px solid #00ffcb;
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${({ ringAnimation }) => ringAnimation && ring} 5s infinite;
  }

  &:hover::after,
  &:focus::after {
    animation: none;
    display: none;
  }
`;
