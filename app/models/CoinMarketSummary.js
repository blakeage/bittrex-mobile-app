import Util from './Util';

class CoinMarketSummary {

  constructor(attributes) {
    this.populateFromData(attributes);
  }

  populateFromData(attributes) {
    this.marketName = attributes.MarketName;
    this.high = attributes.High;
    this.low = attributes.Low;
    this.volume = attributes.Volume;
    this.last = attributes.Last;
    this.baseVolume = attributes.BaseVolume;
    this.timestamp = attributes.TimeStamp;
    this.bid = attributes.Bid;
    this.ask = attributes.Ask;
    this.openBuyOrders = attributes.OpenBuyOrders;
    this.openSellOrders = attributes.OpenSellOrders;
    this.prevDay = attributes.PrevDay;
    this.created = attributes.Created;
  }

  getChange() {
    return Util.round(((this.last - this.prevDay) / this.prevDay) * 100, 2);
  }
}

export default CoinMarketSummary;