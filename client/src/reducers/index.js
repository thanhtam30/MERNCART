import { combineReducers } from 'redux';
import user from './userReducer';
import errors from './errorsReducer';
import producer from './producerReducer';
import product from './productReducer';
import cart from './cartReducers';
import search from './searchReducer';
export default combineReducers({
 user,errors,producer,product,cart,search
 
});
