import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books }) {
  return (
    <div className="books-container">
      {books.map((book, idx) => (
        <BookPreview book={book} key={idx} />
      ))}
    </div>
  );
}
