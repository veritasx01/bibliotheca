import { BookPreview } from "./BookPreview.jsx";
import { bookService } from "../services/bookService.js";
const { useState, useEffect } = React;

export function BookList({ books, onRemove }) {
  return (
    <div className="books-container">
      {books.map((book) => (
        <BookPreview book={book} onRemove={() => onRemove(book.id)} key={book.id} />
      ))}
    </div>
  );
}
