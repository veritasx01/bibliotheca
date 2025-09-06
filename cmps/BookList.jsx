import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books }) {
  return (
    <div className="books-container">
      {books.map((book) => (
        <BookPreview book={book} key={book.id} />
      ))}
    </div>
  );
}
