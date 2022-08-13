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
import {
  InfuraProvider,
  TrackContextValue,
  Account,
  Token,
  TrackContextProviderProps
} from "src/types";

export const TrackContext = createContext<TrackContextValue>(
  {} as TrackContextValue
);

export const TrackContextProvider: FC<TrackContextProviderProps> = ({
  children
}) => {
  const addressesInitialState = getAddressesInitialState();

  const [provider, setProvider] = useState<InfuraProvider>();
  const [addressesToTrack, setAddressesToTrack] = useState<string[]>(
    addressesInitialState
  );
  const [trackedAccounts, setTrackedAccounts] = useState<Account[]>([]);

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

      const indexedSymbols: Token[] = ["LINK", "USDT", "DAI"];

      const balanceForAddress = {
        address: addressToTrack,
        balances: balancesForAddress.map((balance, index) => ({
          symbol: indexedSymbols[index],
          amount: balance
        }))
      };

      return balanceForAddress;
    },
    [getBalance]
  );

  useEffect(() => {
    connectWithProvider();
  }, [connectWithProvider]);

  useEffect(() => {
    console.log("balances: ", trackedAccounts);
  }, [trackedAccounts]);

  useEffect(() => {
    let pollBalancesInterval: NodeJS.Timer;

    if (provider && addressesToTrack.length) {
      const pollBalances = async () => {
        const updatedAccounts = await Promise.all(
          addressesToTrack.map(
            async (address) => await getBalancesForAddress(provider, address)
          )
        );

        setTrackedAccounts(updatedAccounts);
      };

      pollBalances();
      pollBalancesInterval = setInterval(pollBalances, 20000);
    }

    return () => clearInterval(pollBalancesInterval);
  }, [provider, getBalancesForAddress, addressesToTrack]);

  return (
    <TrackContext.Provider value={{ trackedAccounts, addNewAddress }}>
      {children}
    </TrackContext.Provider>
  );
};
