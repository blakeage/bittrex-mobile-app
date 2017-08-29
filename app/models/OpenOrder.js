import Util from './Util';
import Order from './Order';

class OpenOrder extends Order {

  constructor(attributes) {
    super(attributes);
    this.EXCHANGE_FEE = .0025;
    this.commissionPaid = attributes.CommissionPaid;
    this.opened = attributes.Opened;
    this.cancelInitiated = attributes.CancelInitiated;
  }

  fee() {
    return this.quantity * this.limit * this.EXCHANGE_FEE;
  }

  estTotal() {
    if(this.orderType == 'LIMIT_BUY') {
      return -1 * Util.formatNbr(this.quantity * this.limit + this.fee(), 8);
    }
    return Util.formatNbr(this.quantity * this.limit - this.fee(), 8);
  }
}

export default OpenOrder;