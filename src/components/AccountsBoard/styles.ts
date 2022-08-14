import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 1em;
  width: 90%;
  padding: 1em;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    padding: 2em;
  }
`;
