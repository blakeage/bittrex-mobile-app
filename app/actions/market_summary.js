import MarketSummary from '../models/MarketSummary';
import ApiHelper from '../models/ApiHelper';
import CoinMarketSummary from '../models/CoinMarketSummary';
import market_summary_data from "../api_data/market_summary_data.json";

export const REQUEST_MARKET_SUMMARY = 'REQUEST_MARKET_SUMMARY';
export const RECEIVE_MARKET_SUMMARY = 'RECEIVE_MARKET_SUMMARY';
export const MARKET_SUMMARY_ERROR = 'MARKET_SUMMARY_ERROR';

export function requestMarketSummary(forceRefresh) {
  return {
    type: REQUEST_MARKET_SUMMARY,
    forceRefresh
  };
}

function marketSummaryError(error) {
  console.warn(error); //TODO handle these gracefully
  return {
    type: MARKET_SUMMARY_ERROR,
    error
  };
}

export function fetchMarketSummary(forceRefresh) {
  return (dispatch, getState) => {
    // do nothing if we have data already, and they aren't force-refreshing
    if(!forceRefresh && getState().market_summary.market_summary) {
      return;
    }

    if(ApiHelper.stubbing()) {
      dispatch(receiveMarketSummary(market_summary_data));  
      return;
    }

    var uri = ApiHelper.getApiUri('/public/getmarketsummaries');
    fetch(uri, {
      method: 'GET',
      headers: { 'apisign': ApiHelper.getSignature(uri) }
    })
    .then(response => response.json())
    .then(json => dispatch(receiveMarketSummary(json)))
    .catch(error => dispatch(marketSummaryError(error)));
  };
}

export function receiveMarketSummary(json) {
  let ms = new MarketSummary();
  let results = json.result;

  if(results.length > 0) {
    let cms = results.map((cms_data) => { return new CoinMarketSummary(cms_data); });
    ms.setCoinMarketSummaries(cms);
  }
  return {
    type: RECEIVE_MARKET_SUMMARY,
    market_summary: ms 
  };
}