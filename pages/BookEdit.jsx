import { bookService } from "../services/bookService.js";
import { AddReview } from "../cmps/AddReview.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/eventBusService.js";
const { useParams, useNavigate } = ReactRouter;
const { useState, useEffect } = React;

export function BookEdit() {
  const [book, setBook] = useState(bookService.getEmptyBook());
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.bookId) return;
    bookService.get(params.bookId).then(setBook);
  }, []);

  function onSave(ev) {
    ev.preventDefault();
    bookService
      .save(book)
      .then(() => {
        console.log("Book has successfully saved!");
        showSuccessMsg("Book has successfully saved!");
      })
      .catch(() => {
        console.log("couldn't save book");
        showErrorMsg("couldn't save book");
      })
      .finally(() => navigate("/book"));
  }

  function handleChange({ target }) {
    const { type, name: prop } = target;
    let { value } = target;

    switch (type) {
      case "range":
      case "number":
        value = +value;
        break;

      case "checkbox":
        value = target.checked;
        break;
    }
    setBook((prevBook) => ({ ...prevBook, [prop]: value }));
  }

  function handleChangeListPrice({ target }) {
    const { type, name: prop } = target;
    let { value } = target;

    switch (type) {
      case "range":
      case "number":
        value = +value;
        break;

      case "checkbox":
        value = target.checked;
        break;
    }

    setBook((prevBook) => ({
      ...prevBook,
      listPrice: { ...prevBook.listPrice, [prop]: value },
    }));
  }

  const { title, authors, listPrice, description, pageCount } = book;

  return (
    <section className="book-edit">
      <button onClick={() => navigate(`../book/${params.bookId}`)}>Go back to details</button>
      <h2>Add Book</h2>
      Add a book manually:
      <form onSubmit={onSave}>
        <label className="bold-txt" htmlFor="title">
          Title:{" "}
        </label>
        <input
          onChange={handleChange}
          value={title}
          id="title"
          type="text"
          name="title"
        />

        <label className="bold-txt" htmlFor="authors">
          Authors:{" "}
        </label>
        <input
          onChange={handleChange}
          value={authors}
          id="authors"
          type="text"
          name="authors"
        />

        <label className="bold-txt" htmlFor="price">
          Price:{" "}
        </label>
        <input
          onChange={handleChangeListPrice}
          value={listPrice.amount}
          id="price"
          type="number"
          name="amount"
        />

        <label className="bold-txt" htmlFor="description">
          Description:{" "}
        </label>
        <input
          onChange={handleChange}
          value={description}
          id="description"
          type="text"
          name="description"
        />

        <label className="bold-txt" htmlFor="pages">
          Number of pages:{" "}
        </label>
        <input
          onChange={handleChange}
          value={pageCount}
          id="pages"
          type="number"
          name="pageCount"
        />

        <label className="bold-txt" htmlFor="isOnSale">
          On Sale:{" "}
        </label>
        <input
          onChange={handleChangeListPrice}
          checked={listPrice.isOnSale}
          id="isOnSale"
          type="checkbox"
          name="isOnSale"
        />

        <button>Save</button>
      </form>
      <AddReview></AddReview>
      <ScrollableList items={book.reviews}></ScrollableList>
    </section>
  );
}

function ScrollableList({ items, onDelete }) {
  if (!items) items = [];
  return (
    <div
      style={{
        maxHeight: "300px", // constrain height
        overflowY: "auto", // vertical scrolling
        border: "1px solid #ccc",
        padding: "0.5rem",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item, index) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <span>
              full name: {item.fullName} | rating: {item.rating} | read at: {item.date} {" "}
            </span>
            <button onClick={() => onDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScrollableList;
