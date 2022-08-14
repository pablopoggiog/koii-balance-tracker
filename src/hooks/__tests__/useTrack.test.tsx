import { renderHook, act } from "@testing-library/react";
import React from "react";
import { TrackContextProvider } from "src/contexts";
import { mockedAccounts } from "src/utils/testMocks";
import { useTrack } from "../";

describe("useTrack", () => {
  test("Persists a new address in local storage when calling addNewAddress", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TrackContextProvider>{children}</TrackContextProvider>
    );
    const { result } = renderHook(() => useTrack(), { wrapper });
    const { addNewAddress } = result.current;
    const address = mockedAccounts[0].address;

    act(() => {
      addNewAddress(address);
    });

    const savedAddress = localStorage.getItem("addresses-to-track") || "";
    const persistedAccount = JSON.parse(savedAddress);
    expect(persistedAccount).toEqual([address]);
  });
});
