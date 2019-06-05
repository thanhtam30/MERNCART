import * as Types from "../actions/Types";
const inittialState = {
  order: []
};
export default (state = inittialState, action) => {
  switch (action.type) {
    case Types.ORDER:
      return {
        ...state,
        order: [action.payload, ...state.order]
      };
     
    default:
      return state;
  }
};
