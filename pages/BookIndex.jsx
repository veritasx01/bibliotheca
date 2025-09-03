import { BookList } from "../cmps/BookList.jsx";
import { FilterInput } from "../cmps/FilterInput.jsx";
import {
  bookService,
  dummyBooks,
  getEmptyFilter
} from "../services/bookService.js";
const { useState, useEffect } = React;

export function BookIndex() {
  const [books, setBooks] = useState(dummyBooks);
  const [filter, setFilter] = useState(getEmptyFilter);
  
  useEffect(() => {
    bookService.save(dummyBooks);
  },[])

  console.log('books:', books)
  useEffect(() => {
    bookService
      .query(filter)
      .then(setBooks)
      .catch((error) => {
        console.log("exception occured while filtering, exception is: ", error);
      });
  }, [filter]);

  function onSetFilter(newFilter) {
    setFilter((prevFilter) => ({ ...prevFilter, ...newFilter }));
  }

  return (
    <section className="book-index">
      <h1>books</h1>
      <FilterInput onSetFilter={onSetFilter}/>
      <BookList books={books} />
    </section>
  );
}
