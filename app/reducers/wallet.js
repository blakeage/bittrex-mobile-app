import { 
  RECEIVE_BALANCES,
  REQUEST_BALANCES,
  BALANCES_ERROR,
  REQUEST_BALANCE,
  RECEIVE_BALANCE,
  BALANCE_ERROR
} from '../actions/wallet';
import Wallet from '../models/Wallet';

import { RECEIVE_MARKET_SUMMARY } from '../actions/market_summary';

export default function wallet(state = { wallet: null, loading: true }, action) {
  switch (action.type) {
    case REQUEST_BALANCES:
      return {
        ...state,
        loading: action.forceRefresh || !state.wallet
      };

    case REQUEST_BALANCE:
      return {
        ...state,
        loading: action.forceRefresh || !state.wallet || !state.wallet.getCoinBalance(action.currency)
      };

    case RECEIVE_BALANCES:
      var wallet = state.wallet || new Wallet();

      action.balances.forEach(function(bal) {
        wallet.updateOrSetCoinBalance(bal.Currency, bal);
      });

      return {
        loading: true,
        wallet: wallet,
      };

    case RECEIVE_MARKET_SUMMARY:
      var newWallet = state.wallet;
      newWallet.setMarketSummary(action.market_summary);
      return {
        loading: false,
        wallet: newWallet 
      };

    case RECEIVE_BALANCE:
      var newWallet = state.wallet;
      newWallet.updateOrSetCoinBalance(action.balance.Currency, action.balance);
      return {
        loading: false,
        wallet: newWallet,
      };

    case BALANCES_ERROR:
    case BALANCE_ERROR:
      return state;

    default:
      return state;
  }
}