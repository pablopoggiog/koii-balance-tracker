import { FC } from "react";
import { Container, Address, BalancesContainer, TokenBalance } from "./styles";
import { Account } from "src/types";

interface TrackedAccountProps {
  account: Account;
}

export const TrackedAccount: FC<TrackedAccountProps> = ({
  account: { address, balances }
}) => {
  return (
    <Container>
      <Address>{address}</Address>
      <BalancesContainer>
        {balances.map((balance) => (
          <TokenBalance>
            {balance.symbol}: {balance.amount}
          </TokenBalance>
        ))}
      </BalancesContainer>
    </Container>
  );
};
