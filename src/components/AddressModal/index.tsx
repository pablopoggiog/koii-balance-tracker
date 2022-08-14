import { useState, ChangeEvent, FC } from "react";
import Modal from "react-modal";
import { useTrack } from "src/hooks";
import { Button } from "src/components";
import CheckIcon from "src/assets/check.svg";
import {
  Title,
  Form,
  AddressInput,
  CloseButton,
  modalStyles,
  Check,
  ErrorMessage
} from "./styles";

interface AddressModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const AddressModal: FC<AddressModalProps> = ({ isOpen, closeModal }) => {
  const [address, setAddress] = useState<string>("");
  const [inputError, setInputError] = useState<boolean>(false);

  const { addNewAddress } = useTrack();

  const onAddressChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    if (value.match(/^0x[a-fA-F0-9]{40}$/)) {
      setInputError(false);
      setAddress(value);
    } else setInputError(true);
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
        <Button disabled={!address} noTheme onClick={onCheckButtonClick}>
          <Check src={CheckIcon} />
        </Button>
      </Form>
      {inputError && (
        <ErrorMessage>
          It doesn't seem to be a valid Ethereum address!
        </ErrorMessage>
      )}
    </Modal>
  );
};
