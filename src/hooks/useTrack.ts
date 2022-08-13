import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import {
  INFURA_WEBSOCKETS_URL,
  INFURA_PROJECT_ID,
  INFURA_NETWORK
} from "src/constants";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export type WebSocketProvider = ethers.providers.WebSocketProvider;

export const useTrack = () => {
  const [provider, setProvider] = useState<WebSocketProvider>();

  const connectWithProvider = useCallback(() => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setProvider(
          new ethers.providers.WebSocketProvider(
            `${INFURA_WEBSOCKETS_URL}${INFURA_PROJECT_ID}`,
            INFURA_NETWORK
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    connectWithProvider();
  }, [connectWithProvider]);
};
