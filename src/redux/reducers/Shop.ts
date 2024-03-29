import { CLEAN_STATE, GET_SHOP_INFO } from "types"

export type InitialStateType = {
  shopInfo: any
}

const initialState: InitialStateType = {
  shopInfo: null,
}

const shopReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SHOP_INFO: {
      return {
        ...state,
        shopInfo: action.payload,
      }
    }
    case CLEAN_STATE:
      return initialState;
    default:
      return state
  }
}
export default shopReducer
