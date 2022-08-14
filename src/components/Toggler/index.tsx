import { FunctionComponent, ReactNode } from "react";
import { Button } from "src/components";
import { Container } from "./styles";

interface TogglerProps {
  toggleTheme: () => void;
  children: ReactNode;
}

export const Toggler: FunctionComponent<TogglerProps> = ({
  toggleTheme,
  children
}) => (
  <Container>
    <Button onClick={toggleTheme}>{children}</Button>
  </Container>
);
