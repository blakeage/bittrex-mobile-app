import { 
  RECEIVE_MARKET_SUMMARY,
  REQUEST_MARKET_SUMMARY,
  MARKET_SUMMARY_ERROR
} from '../actions/market_summary';

import { REQUEST_WALLET } from '../actions/wallet';

export default function market_summary(state = { market_summary: null, loading: true }, action) {
  switch (action.type) {

    case REQUEST_MARKET_SUMMARY:
    case REQUEST_WALLET:
      return {
        ...state,
        loading: action.forceRefresh || !state.market_summary
      };

    case RECEIVE_MARKET_SUMMARY:
      return {
        loading: false,
        market_summary: action.market_summary
      };

    case MARKET_SUMMARY_ERROR:
      return state;

    default:
      return state;
  }
}