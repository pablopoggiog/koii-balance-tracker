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

export const TrackContext = createContext({});

interface TrackContextProviderProps {
  children: React.ReactNode;
}

export const TrackContextProvider: FC<TrackContextProviderProps> = ({
  children
}) => {
  const [provider, setProvider] = useState<InfuraProvider>();

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
    },
    [getBalance]
  );

  useEffect(() => {
    connectWithProvider();
  }, [connectWithProvider]);

  useEffect(() => {
    if (provider) {
      getBalances(provider, "0xf62f157be11C65E4BCF2003E3Bd77F817208AF24");
    }
  }, [provider, getBalances]);

  return <TrackContext.Provider value={{}}>{children}</TrackContext.Provider>;
};
