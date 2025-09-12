import { BookList } from "../cmps/BookList.jsx";
import { FilterInput } from "../cmps/FilterInput.jsx";
import {
  bookService,
  createBooks,
  getEmptyFilter,
} from "../services/bookService.js";
const { Link } = ReactRouterDOM;
const { useState, useEffect } = React;
const { useNavigate, useSearchParams } = ReactRouterDOM;

export function BookIndex() {
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const maxAmountParam = searchParams.get("maxAmount");
  const minAmountParam = searchParams.get("minAmount");
  const pageCountParam = searchParams.get("pageCount");
  const titleParam = searchParams.get("title");
  const initialFilter = {
    maxAmount: maxAmountParam,
    minAmount: minAmountParam,
    pageCount: pageCountParam,
    title: titleParam,
  };
  const [filter, setFilter] = useState(initialFilter);
  const navigate = useNavigate();

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

  async function removeBook(bookId) {
    try {
      await bookService.remove(bookId);
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
    } catch (err) {
      console.error("remove failed", err);
    }
  }

  console.log("books:", books);
  if (!books) return <div className="loader"></div>;
  function onSetFilter(newFilter) {
    const updatedFilter = { ...filter, ...newFilter };
    setFilter(updatedFilter);
    const cleaned = Object.fromEntries(
      Object.entries(updatedFilter).filter(([_, v]) => v != null && v !== "")
    );
    setSearchParams(cleaned);
  }

  async function makeBook() {
    const newBook = createBooks(1)[0];
    try {
      const saved = await bookService.save(newBook);
      setBooks((prev) => [saved, ...prev]);
    } catch (err) {
      console.error("save failed", err);
    }
  }

  return (
    <section className="book-index">
      <h1>books</h1>
      <FilterInput onSetFilter={onSetFilter} />
      <section className="add-book-container">
        <button onClick={() => navigate("/book/edit")}>Add Custom Book</button>
        <button onClick={() => navigate("/bookadd")}>Add Book</button>
      </section>
      <BookList books={books} onRemove={removeBook} />
    </section>
  );
}
