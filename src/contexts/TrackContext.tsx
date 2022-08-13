import { useEffect, useState, useCallback, createContext, FC } from "react";
import { providers, Contract } from "ethers";
import {
  INFURA_NETWORK,
  INFURA_PROJECT_ID,
  ERC20_ABI,
  DAI_MAINNET_ADDRESS,
  LINK_MAINNET_ADDRESS,
  USDT_MAINNET_ADDRESS
} from "src/constants";
import {
  getAddressesInitialState,
  setAddressesInLocalStorage
} from "src/utils";

declare global {
  interface Window {
    ethereum?: any;
  }
}

type InfuraProvider = providers.InfuraProvider;

type Token = "LINK" | "USDT" | "DAI";

interface TokenBalance {
  amount: string;
  token: Token;
}

interface Balance {
  [address: string]: [TokenBalance, TokenBalance, TokenBalance];
}

interface TrackContextValue {
  addressesToTrack: string[];
  balances: Balance[];
  addNewAddress: (newAddress: string) => void;
}

export const TrackContext = createContext<TrackContextValue>(
  {} as TrackContextValue
);

interface TrackContextProviderProps {
  children: React.ReactNode;
}

export const TrackContextProvider: FC<TrackContextProviderProps> = ({
  children
}) => {
  const addressesInitialState = getAddressesInitialState();

  const [provider, setProvider] = useState<InfuraProvider>();
  const [addressesToTrack, setAddressesToTrack] = useState<string[]>(
    addressesInitialState
  );
  const [balances, setBalances] = useState<Balance[]>([]);

  const addNewAddress = (newAddress: string) => {
    setAddressesToTrack((addresses) => {
      const newState = [...addresses, newAddress];
      setAddressesInLocalStorage(newState);
      return newState;
    });
  };

  const connectWithProvider = useCallback(() => {
    const newProvider = new providers.InfuraProvider(
      INFURA_NETWORK,
      INFURA_PROJECT_ID
    );

    setProvider(newProvider);
  }, []);

  const getBalance = useCallback(
    async (
      provider: InfuraProvider,
      addressToTrack: string,
      contractAddress: string
    ) => {
      const contract = new Contract(contractAddress, ERC20_ABI, provider);
      const balance = (
        (await contract.balanceOf(addressToTrack)) / 1000000000000000000
      ).toString();

      return balance;
    },
    []
  );

  const getBalancesForAddress = useCallback(
    async (provider: InfuraProvider, addressToTrack: string) => {
      const balancesForAddress = await Promise.all([
        getBalance(provider, addressToTrack, LINK_MAINNET_ADDRESS),
        getBalance(provider, addressToTrack, USDT_MAINNET_ADDRESS),
        getBalance(provider, addressToTrack, DAI_MAINNET_ADDRESS)
      ]);

      // console.log("balances: ", balances);
      setBalances((balances) => ({
        ...balances,
        [addressToTrack]: [
          { amount: balancesForAddress[0], token: "LINK" },
          { amount: balancesForAddress[1], token: "USDT" },
          { amount: balancesForAddress[2], token: "DAI" }
        ]
      }));
    },
    [getBalance]
  );

  useEffect(() => {
    connectWithProvider();
  }, [connectWithProvider]);

  useEffect(() => {
    console.log("balances: ", balances);
  }, [balances]);

  useEffect(() => {
    let pollBalancesInterval: NodeJS.Timer;

    if (provider && addressesToTrack.length) {
      const pollBalances = () => {
        addressesToTrack.forEach((address) => {
          getBalancesForAddress(provider, address);
        });
      };

      pollBalances();
      pollBalancesInterval = setInterval(pollBalances, 20000);
    }

    return () => clearInterval(pollBalancesInterval);
  }, [provider, getBalancesForAddress, addressesToTrack]);

  return (
    <TrackContext.Provider
      value={{ addressesToTrack, balances, addNewAddress }}
    >
      {children}
    </TrackContext.Provider>
  );
};
