import { bookService } from "../services/bookService.js";
const { useParams } = ReactRouter;
const { useState, useEffect } = React;

export function AddReview() {
  const [review, setReview] = useState(bookService.getEmptyReview());
  const params = useParams();

  function updateReview({ target }) {
    const { type, name: prop } = target;
    let { value } = target;

    switch (type) {
      case "number":
      case "range":
        value = +value;
        break;
      case "checkbox":
        value = target.checked;
        break;
    }

    if (prop === "rating") value = +value

    setReview((prevReview) => ({ ...prevReview, [prop]: value }));
  }

  function saveReview(event) {
    event.preventDefault();
    console.log("review: ", review);
    try {
      bookService.saveReview(params.bookId, review);
    } catch (e) {
      console.log("error: ", e);
    }
  }

  return (
    <section className="add-review">
      <h2>Add a review:</h2>
      <form onSubmit={saveReview}>
        <label className="bold-txt" htmlFor="fullname">
          Full Name:{" "}
        </label>
        <input
          onChange={updateReview}
          id="fullname"
          name="fullName"
          type="text"
        />
        <label className="bold-txt" htmlFor="rating">
          Rating:{" "}
        </label>
        <select name="rating" id="rating" type="number" onChange={updateReview}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <label className="bold-txt" htmlFor="readAt">
          Read At:{" "}
        </label>
        <input onChange={updateReview} id="readAt" type="date" name="readAt" />
        <button>Submit</button>
      </form>
    </section>
  );
}
