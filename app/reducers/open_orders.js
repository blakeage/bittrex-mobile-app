import { 
  RECEIVE_OPEN_ORDERS,
  REQUEST_OPEN_ORDERS,
  OPEN_ORDERS_ERROR
} from '../actions/open_orders';

export default function open_orders(state = { orders_list: null, loading: true }, action) {
  switch (action.type) {

    case REQUEST_OPEN_ORDERS:
      return {
        ...state,
        loading: action.forceRefresh || !state.orders_list
      };

    case RECEIVE_OPEN_ORDERS:
      return {
        loading: false,
        orders_list: action.orders_list,
      };

    case OPEN_ORDERS_ERROR:
      return state;

    default:
      return state;
  }
}