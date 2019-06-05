import * as Types from './Types';
export const searchproduct = keyword => {
    return {
      type: Types.SEARCH,
      keyword
    };
  };