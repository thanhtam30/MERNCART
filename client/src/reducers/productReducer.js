import * as Types from '../actions/Types'
const initialState={
    product:[],
    loading:false,
    products:[]
}
export default(state=initialState,action)=>{
    switch (action.type) {
        case Types.ADD_PRODUCT:
        return {
          ...state,
          product: [action.payload, ...state.product]
        };
        //
       case Types.GET_PRODUCT:
       return{
         ...state,
         product:action.payload,
         loading:false
       }
       ///
       case Types.GET_PRODUCTS:
       return{
         ...state,
         products:action.payload,
         loading:false
       }
       ///
       case Types.DELETE_PRODUCT:
       return {
         ...state,
         product: state.product.filter(pro => pro._id !== action.payload)
       };
       case Types.LOADING_PRODUCT:
       return{
           ...state,
           loading:true
       }
        default:
            return state
    }
}