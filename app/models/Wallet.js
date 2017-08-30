import Util from './Util';
import CoinBalance from './CoinBalance';

class Wallet {
  constructor() {
    this._coinBalances = [];
    this._marketSummary = null;
  }

  setCoinBalances(coinBalances) {
    this._coinBalances = coinBalances;
  }

  setMarketSummary(ms) {
    this._marketSummary = ms;
  }

  hasCoinBalances() {
    return this._coinBalances.length > 0;
  }

  updateOrSetCoinBalance(currency, balance) {
    let coinBal = this.getCoinBalance(currency);
    if(coinBal) {
      coinBal.populateFromData(balance);
    }
    else {
      this._coinBalances.push(new CoinBalance(balance));      
    }
  }

  getCoinBalance(currency) {
    if(!this.hasCoinBalances()) return null;
    return this._coinBalances.find(coin => coin.currency.toLowerCase().indexOf(currency.toLowerCase()) != -1);
  }

  getCoinsWithMarketSummary(showZero) {
    let ms = this._getMarketSummary();
    if(!this.hasCoinBalances() 
    || !ms
    || !ms.hasCoinMarketSummaries()) return [];

    var coinsWithSummary = this._filterCoins(showZero);
    coinsWithSummary.map(coin => coin.setMarketSummary(ms.getCoinMarketSummary("BTC", coin.currency)));
    return coinsWithSummary;
  }

  getTotalBtc() {
    let ms = this._getMarketSummary();
    if(!this.hasCoinBalances() 
    || !ms
    || !ms.hasCoinMarketSummaries()) return 0;

    let total = 0;
    this._getCoinBalances().forEach(function(coin) {
      if(coin.currency == "BTC") {
        total += coin.available;
      }
      else {
        total += coin.available * ms.getCoinMarketSummary("BTC", coin.currency).last;
      }
    });
    return Util.formatNbr(total, 8);
  }

  getTotalUsd() {
    let ms = this._getMarketSummary();
    if(!ms) return 0;
    return Util.round(this.getTotalBtc() * ms.getCoinMarketSummary("USDT", "BTC").last, 2);
  }

  // private methods
  _getCoinBalances() {
    return this._coinBalances;
  }

  _filterCoins(showZero) {
    let coins = this._getCoinBalances();
    if(!showZero) {
      return coins.filter(coin => coin.balance > 0);
    }
    return coins;
  }

  _getMarketSummary() {
    return this._marketSummary;
  }
}

export default Wallet;