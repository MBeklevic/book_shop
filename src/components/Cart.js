import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BooksContext } from "../App";

const Cart = () => {
  const context = useContext(BooksContext);
  const cartTotalPrice = context.state.cart
    .map((cartItem) => cartItem.count * cartItem.price)
    .reduce((total, price) => total + price, 0)
    .toFixed(2);
  const cartTotalAmount = context.state.cart.reduce(
    (total, book) => total + book.count,
    0
  );
  return (
    <div>
      <div className="App-Nav">
        <div className="App-Nav-F">
          <Link to="/book_shop">Kitap Listesi</Link>{" "}
        </div>
        <div className="App-Nav-S">
          <span>Sepetim ({cartTotalAmount}) </span>
        </div>
      </div>
      <h3>
        Toplam Sepet Tutarı: &#8378;
        {cartTotalPrice}
      </h3>
      {context.state.cart.map((book) => (
        <div key={book.id} className="App-Book-Cart">
          <img src={book.image} alt={book.name} />
          <div>
            <h4>{book.name}</h4>
            <p>Yazar: {book.author}</p>
            <p>Fiyat: &#8378;{book.price}</p>
            <p>Toplam: &#8378;{(book.price * book.count).toFixed(2)}</p>
            <p>Sepetinizde bu kitaptan toplam {book.count} adet var.</p>
            <button onClick={() => context.decrease(book.id)}>-</button>
            <button onClick={() => context.deleteFromCart(book.id)}>
              Sepetten Çıkar
            </button>
            <button onClick={() => context.increase(book.id)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
