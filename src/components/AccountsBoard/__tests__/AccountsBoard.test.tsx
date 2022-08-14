import { render, screen } from "@testing-library/react";
import { getFormattedAmount } from "src/utils";
import { mockedAccounts } from "src/utils/testMocks";
import { AccountsBoard } from "../";

describe("AccountsBoard", () => {
  test("Displays the correct number of cards", () => {
    render(<AccountsBoard accounts={mockedAccounts} />);
    const cardsAmount = screen.getAllByText(/USDT:/i).length;

    expect(cardsAmount).toBe(mockedAccounts.length);
  });

  test("Displays the right balance for each token, within each account", () => {
    render(<AccountsBoard accounts={mockedAccounts} />);
    mockedAccounts.forEach(({ address, balances }) => {
      const addressElement = screen.getByText(address);
      expect(addressElement).toBeInTheDocument();

      balances.forEach(({ amount }) => {
        const balanceElement = screen.getByText(getFormattedAmount(amount));
        expect(balanceElement).toBeInTheDocument();
      });
    });
  });
});
