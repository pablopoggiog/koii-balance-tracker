import Modal from "react-modal";
import { Container } from "./styles";

export const AddressModal = () => {
  return (
    <Modal
      key="address-modal"
      isOpen={true}
      onRequestClose={() => {}}
      ariaHideApp={false}
    >
      <Container>Address modal</Container>
    </Modal>
  );
};
