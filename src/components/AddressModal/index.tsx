import { useState, ChangeEvent, useEffect, FC } from "react";
import Modal from "react-modal";
import { Title, Form, AddressInput, CloseButton, modalStyles } from "./styles";

interface AddressModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const AddressModal: FC<AddressModalProps> = ({ isOpen, closeModal }) => {
  const [address, setAddress] = useState("");

  const onAddressChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    setAddress(value);
  };

  useEffect(() => {
    console.log("address", address);
  }, [address]);

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
      </Form>
    </Modal>
  );
};
