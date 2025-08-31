import { BookList } from "../cmps/BookList.jsx";
import { createBooks } from "../services/bookService.js";

export function BookIndex() {
  let books = createBooks(10);
  return (
    <section className="book-index">
      <h1>books</h1>
      <BookList books={books}/>
    </section>
  );
}
