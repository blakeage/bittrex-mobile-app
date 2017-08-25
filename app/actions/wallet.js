import Wallet from '../models/Wallet';
import ApiHelper from '../models/ApiHelper';
import { requestMarketSummary } from './market_summary';
import wallet_data from "../api_data/wallet_data.json";

export const REQUEST_WALLET = 'REQUEST_WALLET';
export const RECEIVE_WALLET = 'RECEIVE_WALLET';
export const WALLET_ERROR = 'WALLET_ERROR';

export function requestWallet() {
  return {
    type: REQUEST_WALLET
  }
}

function walletError(error) {
  console.warn(error);
  return {
    type: WALLET_ERROR,
    error
  }
}

export function fetchWallet() {
  return (dispatch) => {
    
    if(ApiHelper.stubbing()) {
      dispatch(receiveWallet(wallet_data));
      dispatch(requestMarketSummary());
    }
    else {
      var uri = ApiHelper.getApiUri('/account/getbalances');
      fetch(uri, {
        method: 'GET',
        headers: { 'apisign': ApiHelper.getSignature(uri) }
      })
      .then(response => response.json())
      .then(json => dispatch(receiveWallet(json)))
      .then(() => dispatch(requestMarketSummary()))
      .catch(error => dispatch(walletError(error)));
    }
  };
}

export function receiveWallet(json) {
  let wallet = new Wallet();
  let results = json.result;

  if(results.length > 0) {
    wallet.setCoins(results);
  }
  return { 
    type: RECEIVE_WALLET,
    wallet: wallet
  };
}