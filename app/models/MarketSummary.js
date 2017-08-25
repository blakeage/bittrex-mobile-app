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
		if(!this.hasCoinSummaries()) return 0; 
		var coinSumm = this._coinSummaries.find(summary => summary.MarketName === market + "-" + coin);
		return coinSumm === undefined ? undefined : coinSumm.Last;
	}
}

export default MarketSummary;