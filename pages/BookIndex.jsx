import { BookList } from "../cmps/BookList.jsx";
import { FilterInput } from "../cmps/FilterInput.jsx";
import { createBooks, bookService, dummyBooks } from "../services/bookService.js";
const { useState, useEffect } = React;

export function BookIndex() {
  const [books, setBooks] = useState(dummyBooks);
  return (
    <section className="book-index">
      <h1>books</h1>
      <FilterInput />
      <BookList books={books} />
    </section>
  );
}
