import { createContext, useReducer, useState } from "react";
import CartReducer from "../reducers/CartReducer";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(CartReducer, { items: [] });

  // add item to cart
  function addItem(item) {
    dispatch({ type: "ADD_ITEM", item });
  }
  // update cart items
  function updateItem(id) {}
  // delete cart item
  function deleteItem(id) {
    dispatch({ type: "REMOVE_ITEM", id });
  }
  // clear all items
  function clearAll() {}

  const cartContext = {
    items: cart.items,
    addItem,
    deleteItem,
  };

  console.log(cartContext);
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
