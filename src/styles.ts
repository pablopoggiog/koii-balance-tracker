import styled, { keyframes } from "styled-components";

const gradient = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  padding: 2em;
  min-height: 100vh;
  background-color: #00dbde;
  background-image: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
  box-sizing: border-box;
  animation: ${gradient} 15s ease infinite;
  background-size: 150% 150%;

  @media (min-width: 768px) {
    padding: 5em;
  }
`;
