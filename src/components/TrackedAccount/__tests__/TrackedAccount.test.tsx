import { render, screen } from "@testing-library/react";
import { mockedAccounts } from "src/utils/testMocks";
import { TrackedAccount } from "../";

describe("TrackedAccount", () => {
  test("Shows the date and time from the last time it was updated", () => {
    const fakeDate = new Date(2020, 3, 1);
    jest.useFakeTimers("modern");
    jest.setSystemTime(fakeDate);
    const formattedFakeDate = fakeDate.toLocaleString();

    render(<TrackedAccount account={mockedAccounts[0]} />);
    const expectedMessage = `Last updated: ${formattedFakeDate}`;
    const lastUpdated = screen.getByText(expectedMessage);

    expect(lastUpdated).toBeInTheDocument();

    jest.useRealTimers();
  });
});
