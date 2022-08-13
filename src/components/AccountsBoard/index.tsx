import { FC } from "react";
import { Account } from "src/types";
import { TrackedAccount } from "src/components";
import { Container } from "./styles";

interface AccountsBoardProps {
  accounts: Account[];
}

export const AccountsBoard: FC<AccountsBoardProps> = ({ accounts }) => (
  <Container>
    {accounts?.map((account) => (
      <TrackedAccount key={Object.keys(account)[0]} account={account} />
    ))}
  </Container>
);
