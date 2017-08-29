import { combineReducers } from 'redux'
import order_history from './reducers/order_history';
import open_orders from './reducers/open_orders';
import wallet from './reducers/wallet';
import market_summary from './reducers/market_summary';

import { fetchOrderHistory, REQUEST_ORDER_HISTORY, } from './actions/order_history';
import { fetchOpenOrders, REQUEST_OPEN_ORDERS } from './actions/open_orders';
import { fetchBalances, fetchBalance, REQUEST_BALANCES, REQUEST_BALANCE } from './actions/wallet';
import { fetchMarketSummary, REQUEST_MARKET_SUMMARY } from './actions/market_summary';

export const apiMiddleware = store => next => action => {
  // Pass all actions through by default
  next(action);

  switch (action.type) {

    case REQUEST_ORDER_HISTORY:
      store.dispatch(fetchOrderHistory(action.forceRefresh));
      break;

    case REQUEST_OPEN_ORDERS:
      store.dispatch(fetchOpenOrders(action.forceRefresh));
      break;

    case REQUEST_BALANCES:
      store.dispatch(fetchBalances(action.forceRefresh));
      break;

    case REQUEST_BALANCE:
      store.dispatch(fetchBalance(action.forceRefresh, action.currency));
      break;

    case REQUEST_MARKET_SUMMARY:
      store.dispatch(fetchMarketSummary(action.forceRefresh));
      break;

    default:
      break;
  }
};

export const reducers = combineReducers({
  order_history,
  open_orders,
  wallet,
  market_summary 
});