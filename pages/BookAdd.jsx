import { bookService } from "../services/bookService.js";
const { useState } = React;

export function BookAdd() {
  const [queriedBooks, setQueriedBooks] = useState([]);
  const [query, setQuery] = useState("");

  async function queryBooks() {
    try {
      const res = await bookService.getGoogleBooks(query);
      setQueriedBooks(res || []);
    } catch (err) {
      console.error(err);
      setQueriedBooks([]);
    }
  }

  function addToCollection(event, book) {
    event.preventDefault();
    bookService.save(book);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        queryBooks();
      }}
    >
      <label>Book Name:</label>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      <ul>
        {queriedBooks.map((book) => (
          <div>
            <li key={book.id}>{book.title}</li>
            <button onClick={(event) => addToCollection(event, book)}>
              Add to collection
            </button>
          </div>
        ))}
      </ul>
      <button type="submit">Submit</button>
    </form>
  );
}
