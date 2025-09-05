import { BookList } from "../cmps/BookList.jsx";
import { FilterInput } from "../cmps/FilterInput.jsx";
import {
  bookService,
  createBooks,
  dummyBooks,
  getEmptyFilter,
} from "../services/bookService.js";
const { Link } = ReactRouterDOM;
const { useState, useEffect } = React;

export function BookIndex() {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState(getEmptyFilter());

  useEffect(() => {
    loadBooks();
  }, [filter]);

  function loadBooks() {
    bookService
      .query(filter)
      .then(setBooks)
      .catch((error) => {
        console.log("exception occured while filtering, exception is: ", error);
      });
  }

  console.log("books:", books);
  if (!books) return <div className="loader"></div>;
  function onSetFilter(newFilter) {
    setFilter((prevFilter) => ({ ...prevFilter, ...newFilter }));
  }
  
  function makeBook() {
    console.log('h');
    bookService.save(createBooks(1)[0]);
  }

  return (
    <section className="book-index">
      <h1>books</h1>
      <FilterInput onSetFilter={onSetFilter} />
      <button onClick={makeBook}>makeBook</button>
      <section className="add-book-container">
        <Link to="/book/edit">Add book</Link>
      </section>
      <BookList books={books} />
    </section>
  );
}
