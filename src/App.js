import React, { createContext, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Products from "./components/Products";
import { data } from "./components/data";

export const BooksContext = createContext();

function App() {
  const [state, setState] = useState({
    bookList: data,
    cart: [],
  });
  const addToCart = (book) =>
    setState({
      ...state,
      cart: state.cart.find((cartItem) => cartItem.id === book.id)
        ? state.cart.map((cartItem) =>
            cartItem.id === book.id
              ? { ...cartItem, count: cartItem.count + 1 }
              : cartItem
          )
        : [...state.cart, { ...book, count: 1 }],
    });
  const increase = (id) =>
    setState({
      ...state,
      cart: state.cart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem
      ),
    });
  const deleteFromCart = (id) =>
    setState({
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== id),
    });

  const decrease = (id) => {
    setState({
      ...state,
      cart: state.cart.map((cartItem) =>
        cartItem.id === id
          ? cartItem.count > 1
            ? { ...cartItem, count: cartItem.count - 1 }
            : { ...cartItem, count: 1 }
          : cartItem
      ),
    });
  };
  return (
    <BooksContext.Provider
      value={{ state, addToCart, increase, decrease, deleteFromCart }}
    >
      <div className="App">
        <h1> Book Store</h1>
        <Routes>
          <Route exact path="/book_shop" element={<Products />} />
          <Route path="/book_shop/cart" element={<Cart />} />
        </Routes>
      </div>
    </BooksContext.Provider>
  );
}

export default App;
