import { 
  RECEIVE_ORDER_HISTORY,
  REQUEST_ORDER_HISTORY,
  ORDER_HISTORY_ERROR
} from '../actions/order_history';

export default function order_history(state = { orders_list: null, loading: true }, action) {
  switch (action.type) {
    case REQUEST_ORDER_HISTORY:
      return {
        ...state,
        loading: action.forceRefresh || !state.orders_list
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