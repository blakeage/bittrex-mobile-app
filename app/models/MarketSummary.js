class MarketSummary {

  constructor() {
    this._coinSummaries = [];
  }

  setCoinSummaries(coinSummaries) {
    this._coinSummaries = coinSummaries;
  }

  hasCoinSummaries() {
    return this._coinSummaries.length > 0;
  }

  getLast(market, coin) {
    if(!this.hasCoinSummaries() || coin == "BTC") return 0; 
    return this._coinSummaries.find(summary => summary.MarketName === market + "-" + coin).Last;
  }
}

export default MarketSummary;