import { providers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export type InfuraProvider = providers.InfuraProvider;

export type Token = "LINK" | "USDT" | "DAI";

export interface TokenBalance {
  amount: string;
  symbol: Token;
}

export type Balances = TokenBalance[];

export interface Account {
  address: string;
  balances: Balances;
}

export interface TrackContextValue {
  trackedAccounts: Account[];
  addNewAddress: (newAddress: string) => void;
}

export interface TrackContextProviderProps {
  children: React.ReactNode;
}
