import { BookPreview } from "./BookPreview.jsx";
import { bookService } from "../services/bookService.js";
const { useState, useEffect } = React;

export function BookList({ books }) {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    bookService.query(bookService.getEmptyFilter()).then(setBookList);
  }, [bookList]);

  const removeBook = (bookId) => {
    bookService.remove(bookId);
    bookService.query().then(setBookList);
  };

  return (
    <div className="books-container">
      {bookList.map((book) => (
        <BookPreview book={book} onRemove={removeBook} key={book.id} />
      ))}
    </div>
  );
}
