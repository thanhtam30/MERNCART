import * as Types from '../actions/Types'
const initialState={
    producer:[],
    loading:false
}
export default(state=initialState,action)=>{
    switch (action.type) {
        case Types.ADD_PRODUCER:
        return {
          ...state,
          producer: [action.payload, ...state.producer]
        };
       case Types.GET_PRODUCER:
       return{
         ...state,
         producer:action.payload,
         loading:true
       }
       case Types.DELETE_PRODUCER:
       return {
         ...state,
         producer: state.producer.filter(pro => pro._id !== action.payload)
       };
       case Types.LOADING_PRODUCER:
       return{
           ...state,
           loading:true
       }
        default:
            return state
    }
}