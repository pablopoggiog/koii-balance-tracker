import { Account } from "src/types";

export const mockedAccounts: Account[] = [
  {
    address: "0xf16E9B0D03470827A95CDfd0Cb8a8A3b46969B91",
    balances: [
      {
        symbol: "LINK",
        amount: "30"
      },
      {
        symbol: "USDT",
        amount: "5000"
      },
      {
        symbol: "DAI",
        amount: "999"
      }
    ]
  },
  {
    address: "0xf54f157be11C65E4BCF2003E3Bd43F817208AF77",
    balances: [
      {
        symbol: "LINK",
        amount: "40957.44"
      },
      {
        symbol: "USDT",
        amount: "40"
      },
      {
        symbol: "DAI",
        amount: "1491581"
      }
    ]
  },
  {
    address: "0xf16E9B0D03470827A95CDfd0D48a8A3b46969B91",
    balances: [
      {
        symbol: "LINK",
        amount: "2"
      },
      {
        symbol: "USDT",
        amount: "0"
      },
      {
        symbol: "DAI",
        amount: "100"
      }
    ]
  }
];
