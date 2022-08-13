import { useState, ChangeEvent, useEffect, FC } from "react";
import Modal from "react-modal";
import { useTrack } from "src/hooks";
import CheckIcon from "src/assets/check.svg";
import {
  Title,
  Form,
  AddressInput,
  CloseButton,
  modalStyles,
  Button,
  Check
} from "./styles";

interface AddressModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const AddressModal: FC<AddressModalProps> = ({ isOpen, closeModal }) => {
  const [address, setAddress] = useState("");

  const { addNewAddress } = useTrack();

  const onAddressChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    setAddress(value);
  };

  const onCheckButtonClick = () => {
    addNewAddress(address);
    closeModal();
    setAddress("");
  };

  return (
    <Modal
      key="address-modal"
      isOpen={isOpen}
      ariaHideApp={false}
      style={modalStyles}
    >
      <CloseButton onClick={closeModal}>X</CloseButton>
      <Title>Enter an address to track</Title>
      <Form>
        <AddressInput
          placeholder="address"
          value={address}
          onChange={onAddressChange}
        />
        <Button onClick={onCheckButtonClick}>
          <Check src={CheckIcon} />
        </Button>
      </Form>
    </Modal>
  );
};
