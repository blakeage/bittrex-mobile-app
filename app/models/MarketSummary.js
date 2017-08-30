import CoinMarketSummary from './CoinMarketSummary';

class MarketSummary {

  constructor() {
    this._coinMarketSummaries = [];
  }

  setCoinMarketSummaries(cms) {
    this._coinMarketSummaries = cms;
  }

  hasCoinMarketSummaries() {
    return this._coinMarketSummaries.length > 0;
  }

  getCoinMarketSummary(market, coin) {
    if(!this.hasCoinMarketSummaries() || (market=="BTC" && coin=="BTC")) return null; 
    return this._coinMarketSummaries.find(summary => summary.marketName === market + "-" + coin);
  }
}

export default MarketSummary;