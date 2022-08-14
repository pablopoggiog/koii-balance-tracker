import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { AddressModal, Button, AccountsBoard, Toggler } from "src/components";
import { useTrack } from "src/hooks";
import { theme } from "src/theme";
import { ReactComponent as MoonIcon } from "src/assets/moon.svg";
import { ReactComponent as SunIcon } from "src/assets/sun.svg";
import { Container } from "./styles";

const App = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("dark");

  const { trackedAccounts } = useTrack();

  const openModal = () => setIsAddressModalOpen(true);
  const closeModal = () => setIsAddressModalOpen(false);
  const toggleTheme = () =>
    currentTheme === "light"
      ? setCurrentTheme("dark")
      : setCurrentTheme("light");
  const ThemeIcon = currentTheme === "light" ? SunIcon : MoonIcon;

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        <Toggler toggleTheme={toggleTheme}>
          <ThemeIcon width={20} height={20} />
        </Toggler>
        <Button outline onClick={openModal}>
          Track new address
        </Button>
        <AddressModal isOpen={isAddressModalOpen} closeModal={closeModal} />
        <AccountsBoard accounts={trackedAccounts} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
