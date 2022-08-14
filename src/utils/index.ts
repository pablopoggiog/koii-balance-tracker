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

export const convertHexToRGBA = (hexCode: string) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

export const getFormattedAmount = (amount: string) =>
  new Intl.NumberFormat().format(Math.round(Number(amount)));
