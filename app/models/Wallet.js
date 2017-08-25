class Wallet {
	constructor() {
		this._coins = [];
		this._marketSummary = null;
	}

	setCoins(coins) {
		this._coins = coins;
	}

	setMarketSummary(ms) {
		this._marketSummary = ms;
	}

	hasCoins() {
		return this._coins.length > 0;
	}

	getCoinsWithMarketLast(showZero) {
		var marketSummary = this._getMarketSummary();
		if(!this.hasCoins() || !marketSummary.hasCoinSummaries()) return [];

		var coinsWithPrice = this._filterCoins(showZero);
		coinsWithPrice.map(coin => coin.Last = marketSummary.getLast("BTC", coin.Currency));
		return coinsWithPrice;
	}

	getTotalBtc() {
		var marketSummary = this._getMarketSummary();
		if(!this.hasCoins() || !marketSummary.hasCoinSummaries()) return 0;

		var total = 0;
		this._getCoins().forEach(function(coin) {
			if(coin.Currency == "BTC") {
				total += coin.Available;
			}
			else {
				total += coin.Available * marketSummary.getLast("BTC", coin.Currency);
			}
		});
		return total;
	}

	getTotalUsd() {
		return this.getTotalBtc() * this._getMarketSummary().getLast("USDT", "BTC"); 
	}

	// private methods
	_getCoins() {
		return this._coins;
	}

	_filterCoins(showZero) {
		var coins = this._getCoins();
		if(!showZero) {
			return coins.filter(coin => coin.Balance > 0);
		}
		return coins;
	}

	_getMarketSummary() {
		return this._marketSummary;
	}
}

export default Wallet;