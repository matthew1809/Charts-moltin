import { combineReducers } from 'redux';
import timeReducer from './TimeReducer';
import ordersReducer from './OrdersReducer';

export default combineReducers({
  time: timeReducer,
  orders: ordersReducer
});
