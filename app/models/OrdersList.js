class OrdersList {
  constructor() {
    this._orders = [];
  }

  set(orders) {
    this._orders = orders;
  }

  exists(coin) {
    return this.search(coin).length > 0;
  }

  get() {
    return this._orders;
  }

  search(coin) {
    if(!coin) {
      return this._orders;
    }
    return this._orders.filter(order => order.exchange.toLowerCase().includes("-" + coin.toLowerCase()));
  }
}

export default OrdersList;