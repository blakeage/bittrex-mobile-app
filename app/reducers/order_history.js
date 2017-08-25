import { 
  RECEIVE_ORDER_HISTORY,
  REQUEST_ORDER_HISTORY,
  ORDER_HISTORY_ERROR
} from '../actions/order_history';

export default function order_history(state = { orders_list: null, loading: true }, action) {
  switch (action.type) {
    case REQUEST_ORDER_HISTORY:
      return {
        ...state,                   // keep the existing state,
        loading: true,              // but change loading to true
      };

    case RECEIVE_ORDER_HISTORY:
      return {
        loading: false,
        orders_list: action.orders_list,
      };

    case ORDER_HISTORY_ERROR:
      return state;

    default:
      return state;
  }
}