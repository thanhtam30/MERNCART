import * as Types from './Types';
import axios from 'axios';
export const add = (dataproducer,history)=>dispatch => {
    dispatch(clearerrors());
        axios
            .post('/api/producer', dataproducer)
            .then(res =>history.push('/Producer')) 
            .catch(err=>dispatch({
                type:Types.GET_ERRORS,
                payload:err.response.data
            }))
    
}
///find
export const find=()=>dispatch=>{
    dispatch(loadingproducer())
    axios.get('/api/producer')
    .then(res=>dispatch({
      type:Types.GET_PRODUCER,
      payload:res.data
    }))
    .catch(err=>dispatch({
      type:Types.GET_PRODUCER,
      payload:null
    }))
  }
  export const getupdateproducer=(id)=>dispatch=>{
      axios.get(`/api/producer/getupdateproducer/${id}`)
      .then(res=>dispatch({
          type:Types.GET_PRODUCER,
          payload:res.data
      }))
      .catch(err=>dispatch({
          type:Types.GET_PRODUCER,
          payload:null
      }))
  }//
  export const postupdateproducer=(id,data,history)=>dispatch=>{
      axios.post(`/api/producer/postupdateproducer/${id}`,data)
      .then(res=>history.push('/Producer'))
      .catch(err=>dispatch({
          type:Types.GET_ERRORS,
          payload:err.response.data
      }))
  }
  //delete
  export const deleteproducer=(id)=>dispatch=>{
    if(window.confirm('Are you ready')){
        axios.delete(`/api/producer/${id}`)
        .then(res=>{
          dispatch({
              type:Types.DELETE_PRODUCER,
              payload:id
          })
       })
       .catch(err=>dispatch({
         type:Types.GET_ERRORS,
         payload:err.response.data
       }))
      } 
  
  }
export const loadingproducer=()=>{
    return{
        type:Types.LOADING_PRODUCER
    }
}
export const clearerrors=()=>{
    return {
        type:Types.CLEAR_ERRORS
    }
}