class CoinBalance {

  constructor(attributes) {
    this.populateFromData(attributes);
    this.marketSummary = null;
  }

  populateFromData(attributes) {
    this.currency = attributes.Currency;
    this.balance = attributes.Balance;
    this.available = attributes.Available;
    this.pending = attributes.Pending;
  }

  setMarketSummary(summary) {
    this.marketSummary = summary;
  }
}

export default CoinBalance;