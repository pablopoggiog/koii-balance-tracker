# Welcome to Koii Balance Tracker 🐠

## Summary

Here, you'll be able to:

- See the balances of ERC20 tokens - LINK, USDT and DAI from addresses you want on the Ethereum blockchain and updated in real time.
- Track multiple addresses.
- Get your list of addresses on page load, as it will be persisted in localStorage.
- Constantly track the balance in the background by periodically (every 20 secs) fetching new balances.
- See the app in dark/light mode. There's a dedicated icon button in the top-right corners of the page.

You won't need to connect your wallet to the app in order to use it, Infura is already set up as provider and other fallback providers could be added later as backup 💪.

## Get started

To run the app, you'll have 2 options:

1. Go to the [deployed app](https://pablopoggiog.github.io/koii-balance-tracker), this is by far the simplest and fastest option!
2. Run the app locally.

### Run the app locally

### `npm i`

Installs the required dependencies.\

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

## Flow

1. When initializing the app, it'll automatically grab and start displaying your saved addresses from local storage, if any.
2. If you don't have yet addresses saved, there's no better time than now! Spot the "Track new address" button, and click on it.
3. It'll open a modal, enter or paste an address there and, once you confirm it's ok, click on the ✅ button. If the address is not a valid Ethereum address, the button to confirm won't show up and you'll see an error message explaining this.
3. You'll notice a new card will show up on the screen. It'll display:

    - The address just added to be tracked
    - Its LINK balance
    - Its USDT balance
    - Its DAI balance
    - The last time these balances were updated (it does so every 20 seconds)

4. You will see as well a button on the top-right corner of the app, clicking on it wil toggle between dark and light modes. Try it out! 

### Thank you for making it this far!
If you have suggestions, feel free to open an issue or PR and I'll be glad to review it.