export const cartReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c: any) => c.id !== action.payload.id),
      };
    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((c: any) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export const productReducer = (state: any, action: any) => {
  switch (action.type) {
    case "FILTER_BY_PRICE":
      return { ...state, byPrice: action.payload };
    case "FILTER_BY_COLOR":
      return {
        ...state,
        byColor: action.payload,
      };
    case "FILTER_BY_GENDER":
      return { ...state, byGender: action.payload };
    case "FILTER_BY_TYPE":
      return { ...state, byType: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "CLEAR_FILTERS":
      return { byColor: [], byGender: [], byType: [], byPrice: 0 };
    default:
      return state;
  }
};
