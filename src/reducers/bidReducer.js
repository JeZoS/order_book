export const orderReducer = (state = { ask: [], bid: [] }, action) => {
  switch (action.type) {
    case "UPDATE_BID_SIDE":
      return {
        ...state,
        bid: action.payload,
      };
    case "UPDATE_ASK_SIDE":
      return {
        ...state,
        ask: action.payload,
      };
    default:
      return {};
  }
};
