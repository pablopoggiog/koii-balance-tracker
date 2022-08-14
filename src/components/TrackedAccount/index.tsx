import { FC } from "react";
import { Account } from "src/types";
import LinkLogo from "src/assets/link.svg";
import UsdtLogo from "src/assets/usdt.svg";
import DaiLogo from "src/assets/dai.svg";
import {
  Container,
  Address,
  BalancesContainer,
  TokenBalance,
  Icon,
  Name,
  LastUpdated
} from "./styles";

interface TrackedAccountProps {
  account: Account;
}

const TOKEN_ICONS = {
  LINK: LinkLogo,
  USDT: UsdtLogo,
  DAI: DaiLogo
};

export const TrackedAccount: FC<TrackedAccountProps> = ({
  account: { address, balances }
}) => {
  const lastUpdated = `Last updated: ${new Date().toLocaleString()}`;
  const getFormattedAmount = (amount: string) =>
    new Intl.NumberFormat().format(Math.round(Number(amount)));

  return (
    <Container>
      <Address>{address}</Address>
      <BalancesContainer>
        {balances.map((balance, index) => (
          <TokenBalance key={index}>
            <Name>
              <Icon
                alt={`${TOKEN_ICONS[balance.symbol]} icon`}
                src={TOKEN_ICONS[balance.symbol]}
              />
              {balance.symbol}:
            </Name>
            <span>{getFormattedAmount(balance.amount)}</span>
          </TokenBalance>
        ))}
      </BalancesContainer>
      <LastUpdated>{lastUpdated}</LastUpdated>
    </Container>
  );
};
