import { useState } from "react";
import { AddressModal, Button, AccountsBoard } from "src/components";
import { useTrack } from "src/hooks";
import { Container } from "./styles";

const App = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);

  const { trackedAccounts } = useTrack();

  const openModal = () => setIsAddressModalOpen(true);
  const closeModal = () => setIsAddressModalOpen(false);

  return (
    <Container>
      <Button ringAnimation onClick={openModal}>
        Track new address
      </Button>
      <AddressModal isOpen={isAddressModalOpen} closeModal={closeModal} />
      <AccountsBoard accounts={trackedAccounts} />
    </Container>
  );
};

export default App;
