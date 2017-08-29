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

export function requestBalances(forceRefresh) {
  return {
    type: REQUEST_BALANCES,
    forceRefresh
  }
}

function balancesError(error) {
  console.warn(error); //TODO handle these gracefully
  return {
    type: BALANCES_ERROR,
    error
  }
}

export function fetchBalances(forceRefresh) {
  return (dispatch, getState) => {
    // do nothing if we have data already, and they aren't force-refreshing
    if(!forceRefresh && getState().wallet.wallet) {
      dispatch(requestMarketSummary(forceRefresh));
      return;
    }   

    if(ApiHelper.stubbing()) {
      dispatch(receiveBalances(balances_data));
      dispatch(requestMarketSummary(forceRefresh));
      return
    }

    var uri = ApiHelper.getApiUri('/account/getbalances');
    fetch(uri, {
      method: 'GET',
      headers: { 'apisign': ApiHelper.getSignature(uri) }
    })
    .then(response => response.json())
    .then(json => dispatch(receiveBalances(json)))
    .then(() => dispatch(requestMarketSummary(forceRefresh)))
    .catch(error => dispatch(balancesError(error)));
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

export function requestBalance(forceRefresh, currency) {
  return {
    type: REQUEST_BALANCE,
    forceRefresh,
    currency
  }
}

function balanceError(error) {
  console.warn(error); //TODO handle these gracefully
  return {
    type: BALANCE_ERROR,
    error
  }
}

export function fetchBalance(forceRefresh, currency) {
  return (dispatch, getState) => {
    // do nothing if we have data already, and they aren't force-refreshing
    if(!forceRefresh && getState().wallet.wallet && getState().wallet.wallet.getCoinBalance(currency)) {
      return;
    }   

    if(ApiHelper.stubbing()) {
      dispatch(receiveBalance(balance_data));
      return;
    }

    var uri = ApiHelper.getApiUri('/account/getbalance', { "currency": currency });
    fetch(uri, {
      method: 'GET',
      headers: { 'apisign': ApiHelper.getSignature(uri) }
    })
    .then(response => response.json())
    .then(json => dispatch(receiveBalance(json)))
    .catch(error => dispatch(balanceError(error)));
  };
}

export function receiveBalance(json) {
  return { 
    type: RECEIVE_BALANCE,
    balance: json.result
  };
}