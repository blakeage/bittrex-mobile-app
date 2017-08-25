import Moment from 'moment';

class Util {
  static round(number, decimals) {
    return +(Math.round(number + "e+" + decimals) + "e-" + decimals);
  }

  static formatDate(dt) {
    Moment.locale('en');
    return Moment(dt).add(Moment().utcOffset(), 'minutes').format('MM-DD-YYYY hh:mm:ssa');
  }
}

export default Util;