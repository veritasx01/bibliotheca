import { bookService } from "../services/bookService.js";
import { AddReview } from "../cmps/AddReview.jsx";
import { ReviewsList } from "../cmps/ReviewsList.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/eventBusService.js";
const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouterDOM;

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

  async function saveReview(event, review) {
    event.preventDefault();
    try {
      await bookService.saveReview(params.bookId, review);
      const updatedBook = await bookService.get(params.bookId);
      setBook(updatedBook);
    } catch (e) {
      console.log("error: ", e);
    }
  }
  async function handleDelete(event, reviewId) {
    event.preventDefault();
    try {
      await bookService.removeReview(book.id, reviewId);
      const updatedBook = await bookService.get(params.bookId);
      setBook(updatedBook);
    } catch (e) {
      console.log(e);
    }
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
  const backKeyword = params.bookId ? "details" : "list";
  return (
    <section className="book-edit">
      <button
        onClick={() => navigate(`../book/${params.bookId}`)}
      >{`Go back to ${backKeyword}`}</button>
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
      <AddReview onSaveReview={saveReview}></AddReview>
      <ReviewsList reviews={book.reviews} onDelete={handleDelete}></ReviewsList>
    </section>
  );
}
