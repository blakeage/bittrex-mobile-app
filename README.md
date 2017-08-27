# Bittrex.com Mobile App
An Unofficial mobile app for [bittrex.com](http://bittrex.com) crypto-currency exchange 

## Purpose 
The purpose of the project is to build a mobile app consuming the bittrex.com API.

## Technology
The app is built in React Native, and uses Redux for state management. It is currently a work-in-progress, with READ-only capability.

API keys are currently hard-coded in the app, but the intention is to add a form in the app for entering these.

A QR code on the website or some other method (from the Bittrex team) might work for storing these keys in the app, so that they don't have to entered manually.  The API does not currently provide an authentication endpoint, so a traditional login isn't possible via the API.

## Initial Goals
Initially, I'd like to support READ-only access to the API, with the ability to trade afterwards.

# Helpful links 
https://github.com/mvayngrib/react-native-crypto
