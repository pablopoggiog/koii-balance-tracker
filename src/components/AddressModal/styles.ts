import styled from "styled-components";
import { Styles as ModalStyles } from "react-modal";

export const Title = styled.h2`
  margin: 0;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export const AddressInput = styled.input`
  border-radius: 0.5em;
  height: 2.5em;
  text-align: center;
`;

export const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  color: white;
  margin-left: auto;
  cursor: pointer;
`;

export const modalStyles: ModalStyles = {
  content: {
    maxWidth: "30em",
    height: "fit-content",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "1em",
    boxSizing: "border-box",
    color: "white",
    backgroundColor: "#282c34",
    borderRadius: "0.5em",
    textAlign: "center"
  },
  overlay: { background: "rgba(148,0,211,0.3)" }
};

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
  margin: 1em 0;
  box-sizing: border-box;
  &:focus {
    outline: 0;
  }
`;

export const Check = styled.img`
  width: 2em;
  height: 2.5em;
`;
