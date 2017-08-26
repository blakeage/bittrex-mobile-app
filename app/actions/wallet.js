import Wallet from '../models/Wallet';
import ApiHelper from '../models/ApiHelper';
import { requestMarketSummary } from './market_summary';
import balances_data from "../api_data/balances_data.json";

export const REQUEST_BALANCES = 'REQUEST_BALANCES';
export const RECEIVE_BALANCES = 'RECEIVE_BALANCES';
export const BALANCES_ERROR = 'BALANCES_ERROR';

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
    wallet.setCoins(results);
  }
  return { 
    type: RECEIVE_BALANCES,
    wallet: wallet
  };
}