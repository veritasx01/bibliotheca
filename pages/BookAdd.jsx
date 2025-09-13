import { bookService } from "../services/bookService.js";
import { showSuccessMsg, showErrorMsg } from "../services/eventBusService.js";
import { utilService } from "../services/util.js";
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
    bookService
      .save(book)
      .then(() => showSuccessMsg("book added successfully"))
      .catch((error) => {
        showErrorMsg("book couldn't be added");
        console.log("error saving book, error: ", error);
      });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        utilService.debounce(queryBooks, 300);
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
