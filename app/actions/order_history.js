import OrdersList from '../models/OrdersList';
import ClosedOrder from '../models/ClosedOrder';
import ApiHelper from '../models/ApiHelper';
import order_history_data from "../api_data/order_history_data.json";

export const REQUEST_ORDER_HISTORY = 'REQUEST_ORDER_HISTORY';
export const RECEIVE_ORDER_HISTORY = 'RECEIVE_ORDER_HISTORY';
export const ORDER_HISTORY_ERROR = 'ORDER_HISTORY_ERROR';

export function requestOrderHistory() {
  return {
    type: REQUEST_ORDER_HISTORY
  }
}

function orderHistoryError(error) {
	return {
    type: ORDER_HISTORY_ERROR,
		error
  }
}

export function fetchOrderHistory() {
	return (dispatch) => {
		if(ApiHelper.stubbing()) {
			dispatch(receiveOrderHistory(order_history_data));	
			return;
		}

		var uri = ApiHelper.getApiUri('/account/getorderhistory');
		fetch(uri, {
			method: 'GET',
			headers: { 'apisign': ApiHelper.getSignature(uri) }
		})
		.then(response => response.json())
		.then(json => dispatch(receiveOrderHistory(json)))
		.catch(error => dispatch(orderHistoryError(error)));
	};
}

export function receiveOrderHistory(json) {
	let ordersList = new OrdersList();
	let results = json.result;

	if(results.length > 0) {
		let orders = results.map((ord_data) => { return new ClosedOrder(ord_data); });
		ordersList.set(orders);
	}
  return {
    type: RECEIVE_ORDER_HISTORY,
    orders_list: ordersList 
  }
}