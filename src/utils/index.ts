export const getAddressesInitialState = () => {
  const addressesInLocalStorage =
    window.localStorage.getItem("addresses-to-track");
  const addressesInitialState: string[] =
    typeof addressesInLocalStorage === "string"
      ? JSON.parse(addressesInLocalStorage)
      : [];

  return addressesInitialState;
};

export const setAddressesInLocalStorage = (addresses: string[]) => {
  window.localStorage.setItem("addresses-to-track", JSON.stringify(addresses));
};
