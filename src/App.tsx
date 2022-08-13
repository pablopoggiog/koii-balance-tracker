import { useState } from "react";
import { AddressModal } from "src/components";
import { Container } from "./styles";

const App = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);

  const openModal = () => setIsAddressModalOpen(true);
  const closeModal = () => setIsAddressModalOpen(false);

  return (
    <Container>
      App
      <button onClick={openModal}>Track new address</button>
      <AddressModal isOpen={isAddressModalOpen} closeModal={closeModal} />
    </Container>
  );
};

export default App;
