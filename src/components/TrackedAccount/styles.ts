import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
  border-radius: 1em;
  padding: 2em;
  box-sizing: border-box;
  max-width: 400px;
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(21px);
  -webkit-backdrop-filter: blur(21px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.36);
  text-shadow: 1px 1px #32cfd1a7, -1px -1px #e1a8f0;
  margin: auto;
`;

export const Address = styled.p`
  word-break: break-all;
  text-align: center;
  color: white;
  font-weight: bold;
`;

export const BalancesContainer = styled.div`
  gap: 1em;
  display: flex;
  flex-direction: column;
`;

export const TokenBalance = styled.div`
  background-color: #e5c5ee;
  padding: 1em;
  border-radius: 1em;
  font-weight: bold;
  opacity: 0.8;
  width: 10em;
  justify-content: space-between;
  display: flex;
`;

export const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3em;
`;

export const Icon = styled.img`
  width: 1em;
  height: 1em;
`;

export const LastUpdated = styled.p`
  font-size: 0.5em;
`;
