import styled from "styled-components";
import { Styles as ModalStyles } from "react-modal";

export const Title = styled.h2``;

export const Form = styled.form`
  display: flex;
  gap: 1em;
`;

export const AddressInput = styled.input`
  border-radius: 0.5em;
`;

export const modalStyles: ModalStyles = {
  content: {
    maxWidth: "30em",
    height: "11em",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1em",
    boxSizing: "border-box",
    color: "white",
    backgroundColor: "#282c34",
    borderRadius: "0.5em"
  }
};
