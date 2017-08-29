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

  updateCoinBalance(currency, balance) {
    let coinBal = this.getCoinBalance(currency);
    if(coinBal) coinBal.populateFromData(balance);
  }

  getCoinBalance(currency) {
    if(!this.hasCoinBalances()) return null;
    return this._coinBalances.find(coin => coin.currency.toLowerCase().indexOf(currency.toLowerCase()) != -1);
  }

  getCoinsWithMarketLast(showZero) {
    let ms = this._getMarketSummary();
    if(!this.hasCoinBalances() 
    || !ms
    || !ms.hasCoinSummaries()) return [];

    var coinsWithPrice = this._filterCoins(showZero);
    coinsWithPrice.map(coin => coin.last = ms.getLast("BTC", coin.currency));
    return coinsWithPrice;
  }

  getTotalBtc() {
    let ms = this._getMarketSummary();
    if(!this.hasCoinBalances() 
    || !ms
    || !ms.hasCoinSummaries()) return 0;

    let total = 0;
    this._getCoinBalances().forEach(function(coin) {
      if(coin.currency == "BTC") {
        total += coin.available;
      }
      else {
        total += coin.available * ms.getLast("BTC", coin.currency);
      }
    });
    return total;
  }

  getTotalUsd() {
    let ms = this._getMarketSummary();
    if(!ms) return 0;
    return this.getTotalBtc() * ms.getLast("USDT", "BTC"); 
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