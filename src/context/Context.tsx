import product from "../api/product";

import {
  createContext,
  useState,
  useEffect,
  useReducer,
  useContext,
} from "react";
import { cartReducer, productReducer } from "./Reducers";
const CartContext = createContext<any>(null);

const Context = ({ children }: any) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
  });
  const fetchProducts = async () => {
    const response = await product.get("catalogue.json");
    setData(response.data);
    setIsLoading(false);
    return dispatch({ type: "GET_PRODUCTS", payload: response.data });
  };
  const [productState, productDispatch] = useReducer(productReducer, {
    byColor: [],
    byGender: [],
    byType: [],
    searchQuery: "",
    byPrice: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{ state, dispatch, productState, productDispatch }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartState = () => {
  return useContext(CartContext);
};
export default Context;
