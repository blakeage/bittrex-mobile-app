import Util from './Util';
import Order from './Order';

class ClosedOrder extends Order {

	constructor(attributes) {
		super(attributes);
		this.commission = attributes.Commission;
		this.timeStamp = attributes.TimeStamp;
	}

	cost() {
		if(this.orderType == 'LIMIT_BUY') {
			return -1 * Util.round(this.price + this.commission, 8);
		}
		return Util.round(this.price - this.commission, 8);
	}
}

export default ClosedOrder;