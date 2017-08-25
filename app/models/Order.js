class Order {

	constructor(attributes) {
		this.orderUuid = attributes.OrderUuid;
		this.exchange = attributes.Exchange;
		this.orderType = attributes.OrderType;
		this.limit = attributes.Limit;
		this.quantity = attributes.Quantity;
		this.quantityRemaining = attributes.QuantityRemaining;
		this.price = attributes.Price;
		this.pricePerUnit = attributes.PricePerUnit;
		this.isConditional = attributes.IsConditional;
		this.condition = attributes.Condition;
		this.conditionTarget = attributes.ConditionTarget;
		this.immediateOrCancel = attributes.ImmediateOrCancel;
		this.closed = attributes.Closed;
	}

	unitsFilled() {
		return this.quantity - this.quantityRemaining;
	}

	orderTypeStr() {
		if(this.orderType == 'LIMIT_BUY') return "Limit Buy"; 
		return "Limit Sell";
	}
}

export default Order;