import Wallet from '../models/Wallet';
import ApiHelper from '../models/ApiHelper';
import CoinBalance from '../models/CoinBalance';
import { requestMarketSummary } from './market_summary';
import balances_data from "../api_data/balances_data.json";
import balance_data from "../api_data/balance_data.json";

export const REQUEST_BALANCES = 'REQUEST_BALANCES';
export const RECEIVE_BALANCES = 'RECEIVE_BALANCES';
export const BALANCES_ERROR = 'BALANCES_ERROR';

export const REQUEST_BALANCE = 'REQUEST_BALANCE';
export const RECEIVE_BALANCE = 'RECEIVE_BALANCE';
export const BALANCE_ERROR = 'BALANCE_ERROR';

export function requestBalances() {
  return {
    type: REQUEST_BALANCES
  }
}

function balancesError(error) {
  console.warn(error);
  return {
    type: BALANCES_ERROR,
    error
  }
}

export function fetchBalances() {
  return (dispatch) => {
    
    if(ApiHelper.stubbing()) {
      dispatch(receiveBalances(balances_data));
      dispatch(requestMarketSummary());
    }
    else {
      var uri = ApiHelper.getApiUri('/account/getbalances');
      fetch(uri, {
        method: 'GET',
        headers: { 'apisign': ApiHelper.getSignature(uri) }
      })
      .then(response => response.json())
      .then(json => dispatch(receiveBalances(json)))
      .then(() => dispatch(requestMarketSummary()))
      .catch(error => dispatch(balancesError(error)));
    }
  };
}

export function receiveBalances(json) {
  let wallet = new Wallet();
  let results = json.result;

  if(results.length > 0) {
    let balances = results.map((bal_data) => { return new CoinBalance(bal_data); });
    wallet.setCoinBalances(balances);
  }

  return { 
    type: RECEIVE_BALANCES,
    wallet: wallet
  };
}

export function requestBalance(currency) {
  return {
    type: REQUEST_BALANCE,
    currency
  }
}

function balanceError(error) {
  console.warn(error);
  return {
    type: BALANCE_ERROR,
    error
  }
}

export function fetchBalance(currency) {
  return (dispatch) => {
    
    if(ApiHelper.stubbing()) {
      dispatch(receiveBalance(balance_data));
    }
    else {
      var uri = ApiHelper.getApiUri('/account/getbalance', { "currency": currency });
      fetch(uri, {
        method: 'GET',
        headers: { 'apisign': ApiHelper.getSignature(uri) }
      })
      .then(response => response.json())
      .then(json => dispatch(receiveBalance(json)))
      .catch(error => dispatch(balanceError(error)));
    }
  };
}

export function receiveBalance(json) {
  return { 
    type: RECEIVE_BALANCE,
    balance: json.result
  };
}