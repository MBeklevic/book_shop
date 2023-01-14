import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BooksContext } from "../App";

const Products = () => {
  const context = useContext(BooksContext);

  const cartTotalAmount = context.state.cart.reduce(
    (total, book) => total + book.count,
    0
  );
  return (
    <div>
      <div className="App-Nav">
        <div className="App-Nav-F">
          <span>Kitap Listesi</span>
        </div>
        <div className="App-Nav-S">
          <Link to="/book_shop/cart">Sepetim ({cartTotalAmount})</Link>
        </div>
      </div>
      {context.state.bookList.map((book) => (
        <div key={book.id} className="App-Book">
          <img src={book.image} alt={book.name} />
          <div>
            <h4>{book.name}</h4>
            <p>Yazar: {book.author}</p>
            <p>Fiyat: &#8378; {book.price}</p>
            <button onClick={() => context.addToCart(book)}>Sepete Ekle</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
