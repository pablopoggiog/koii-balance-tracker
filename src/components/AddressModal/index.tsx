import { useState, ChangeEvent, useEffect } from "react";
import Modal from "react-modal";
import { Title, Form, AddressInput, modalStyles } from "./styles";

export const AddressModal = () => {
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
      isOpen={true}
      onRequestClose={() => {}}
      ariaHideApp={false}
      style={modalStyles}
    >
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
