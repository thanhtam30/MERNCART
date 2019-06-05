import * as Types from './Types';
import axios from 'axios';
export const addproduct = (dataproduct,history)=>dispatch => {
    
        axios
            .post('/api/product', dataproduct)
            .then(res =>history.push('/Product')) 
            .catch(err=>dispatch({
                type:Types.GET_ERRORS,
                payload:err.response.data
            }))
    
}

///find
export const getproduct=()=>dispatch=>{
    dispatch(loadingproduct())
    axios.get('/api/product')
    .then(res=>dispatch({
      type:Types.GET_PRODUCT,
      payload:res.data
    }))
    .catch(err=>dispatch({
      type:Types.GET_PRODUCT,
      payload:null
    }))
  }
  export const getupdateproduct=(id)=>dispatch=>{
      axios.get(`/api/product/getupdateproduct/${id}`)
      .then(res=>dispatch({
          type:Types.GET_PRODUCT,
          payload:res.data
      }))
      .catch(err=>dispatch({
          type:Types.GET_PRODUCT,
          payload:null
      }))
  }//
  export const postupdateproduct=(id,data,history)=>dispatch=>{
      axios.post(`/api/product/postupdateproduct/${id}`,data)
      .then(res=>history.push('/Product'))
      .catch(err=>dispatch({
          type:Types.GET_ERRORS,
          payload:err.response.data
      }))
  }
  //delete
  export const deleteproduct=(id)=>dispatch=>{
    if(window.confirm('Are you ready')){
        axios.delete(`/api/product/${id}`)
        .then(res=>{
          dispatch({
              type:Types.DELETE_PRODUCT,
              payload:id
          })
       })
       .catch(err=>dispatch({
         type:Types.GET_ERRORS,
         payload:err.response.data
       }))
      } 
  
  }
  //delete
  export const deleteimage=(id,ha)=>dispatch=>{
    if(window.confirm('Are you ready')){
        axios.delete(`/api/product/hinhanh/${id}/${ha}`)
        .then(res=>{
          dispatch({
              type:Types.GET_PRODUCT,
              payload:res.data
          })
       })
       .catch(err=>dispatch({
        type: Types.GET_ERRORS,
        payload: err.response.data
       }))
      } 
  
  }
  ////
export const loadingproduct=()=>{
    return{
        type:Types.LOADING_PRODUCT
    }
}
//clearerrors
export const clearerrors=()=>{
    return {
        type:Types.CLEAR_ERRORS
    }
}
//get index
export const index=()=>dispatch=>{
  
    axios.get('/api/product/allProduct')
    .then(res=>dispatch({
      type:Types.GET_PRODUCTS,
      payload:res.data
    }))
    .catch(err=>dispatch({
      type:Types.GET_PRODUCTS,
      payload:null
    }))
}
//
export const detail=(id)=>dispatch=>{
  dispatch(clearerrors())
  axios.get(`/api/product/detail/${id}`)
  .then(res=>dispatch({
      type:Types.GET_PRODUCTS,
      payload:res.data
  }))
  .catch(err=>dispatch({
      type:Types.GET_PRODUCTS,
      payload:null
  }))
}
///comment
export const comment=(id,datacomment)=>dispatch=>{
  axios.post(`/api/product/comment/${id}`,datacomment)
  .then(res=>dispatch({
      type:Types.GET_PRODUCTS,
      payload:res.data
  }))
  .catch(err=>dispatch({
    type: Types.GET_ERRORS,
    payload: err.response.data
  }))
}
///rating
export const rating=(id,datarating)=>dispatch=>{
  axios.post(`/api/product/rating/${id}`,datarating)
  .then(res=>dispatch(
    {
      type:Types.GET_PRODUCTS,
      payload:res.data
  })
  )
  .catch(err=>dispatch({
    type: Types.GET_ERRORS,
    payload: err.response.data
  }))
}