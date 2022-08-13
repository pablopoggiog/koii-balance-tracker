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

declare global {
  interface Window {
    ethereum?: any;
  }
}

type InfuraProvider = providers.InfuraProvider;

interface Balance {
  [address: string]: {
    balances: {
      LINK: string;
      USDT: string;
      DAI: string;
    };
  };
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
  const [provider, setProvider] = useState<InfuraProvider>();
  const [addressesToTrack, setAddressesToTrack] = useState<string[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);

  const addNewAddress = (newAddress: string) => {
    setAddressesToTrack((addresses) => [...addresses, newAddress]);
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

  const getBalances = useCallback(
    async (provider: InfuraProvider, addressToTrack: string) => {
      const balances = await Promise.all([
        getBalance(provider, addressToTrack, LINK_MAINNET_ADDRESS),
        getBalance(provider, addressToTrack, USDT_MAINNET_ADDRESS),
        getBalance(provider, addressToTrack, DAI_MAINNET_ADDRESS)
      ]);

      console.log("balances: ", balances);
      setBalances((balances) => ({
        ...balances,
        [addressToTrack]: {
          balances: { LINK: balances[0], USDT: balances[1], DAI: balances[2] }
        }
      }));
    },
    [getBalance]
  );

  useEffect(() => {
    connectWithProvider();
  }, [connectWithProvider]);

  useEffect(() => {
    if (provider && addressesToTrack.length) {
      addressesToTrack.forEach((address) => {
        getBalances(provider, address);
      });
    }
  }, [provider, getBalances, addressesToTrack]);

  return (
    <TrackContext.Provider
      value={{ addressesToTrack, balances, addNewAddress }}
    >
      {children}
    </TrackContext.Provider>
  );
};
