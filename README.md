# Bittrex.com Mobile App
An unofficial mobile app for [bittrex.com](http://bittrex.com) crypto-currency exchange.  Please note, this is likely out of sync with their latest API.  I have stopped working on it (for now), but if anyone wants to contribute, please reach out.

## Purpose 
The purpose of the project is to build a mobile app consuming the bittrex.com API.

## Technology
The app is built in [React Native](https://facebook.github.io/react-native), and uses [Redux](http://redux.js.org) for state management. It is currently a work-in-progress, with READ-only capability.

API keys are currently hard-coded in the ApiHelper.js file. An ApiHelper.js.example file is included in app/models.  Add your keys to this file, and then save it as ApiHelper.js

### Redux State Shape
```JavaScript
{
  wallet: { wallet: "a Wallet model object", loading: true },
  order_history: { orders_list: "an OrdersList model object", loading: true },
  market_summary: { market_summary: "a MarketSummary model object", loading: true },
  open_orders: { orders_list: "an OrdersList model object", loading: true }
}
```

## Initial Goals
Initial support is for READ-only access to the API, with the ability to trade coming later.  This is my first foray into React Native, so I'm tackling the basics to get started.

## Related links 
https://github.com/mvayngrib/react-native-crypto
