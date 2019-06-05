import * as Types from './Types'
import axios from 'axios';
// GET CART
export const getCart = () => dispatch => {
  axios.get('/api/cart')
    .then(res => dispatch({
      type: Types.GET_CART,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: Types.GET_CART,
      payload: null
    }))
}
//Them cart
export const addToCart = (cart) => dispatch => {
  axios.post('/api/cart', cart)
    .then(res => dispatch({
      type: Types.ADD_TO_CART,
      payload: res.data
    })).catch(err => dispatch({
      type: Types.ADD_TO_CART,
      payload: null
    }))
}

//update
// UPDATE CART
// UPDATE CART
export function updateCart(_id, unit, cart){
  // Create a copy of the current array of books
  const CartUpdate = cart
  // Determine at which index in books array is the book to be deleted
  const index=CartUpdate.findIndex((cart)=>cart._id===_id)
  const newCartUpdate = {
    ...CartUpdate[index],
    qty: CartUpdate[index].qty + unit
  }

  let cartUpdate = [...CartUpdate.slice(0, index), newCartUpdate, ...CartUpdate.slice(index + 1)]

  return (dispatch)=>{
    axios.post("/api/cart", cartUpdate)
      .then((response)=>{
        dispatch({type:Types.UPDATE_CART, payload:response.data})
      })
      .catch((err)=>{
        dispatch({type:"UPDATE_CART_REJECTED", msg: 'error when adding to the cart'})
      })
  }
}

// DELETE FROM CART
export const deleCart = (cart) => dispatch => {
 if(window.confirm('Are you ready')) {
    axios.post('/api/cart', cart)
    .then(res => dispatch({
      type: Types.DELETE_CART_ITEM,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: Types.DELETE_CART_ITEM,
      payload: null
    }))
  }

}
// DELETE FROM CART
export const OrderCart = (cart,history) => dispatch => {
 
     axios.post('/api/cart/order', cart)
     .then(res=>history.push('/'))
     .catch(err=>dispatch({
      type: Types.GET_ERRORS,
      payload: err.response.data
    }))
   
 
 }

//
export const clearCart=()=>{
  return {
      type:Types.CLEAR_CART
  }
}

