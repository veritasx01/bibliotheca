import { bookService } from "../services/bookService.js";
const { useParams } = ReactRouter;
const { useState, useEffect } = React;

export function AddReview() {
  const [book, setBook] = useState(bookService.getEmptyBook());
  const params = useParams();

  useEffect(() => {
    if (!params.bookId) return;
    bookService.get(params.bookId).then(setBook);
  }, []);

  return (
    <form>
      <h2>Add a review:</h2>
    </form>
  );
}
