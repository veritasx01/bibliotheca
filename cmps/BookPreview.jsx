import { BookDetails } from "./BookDetails.jsx";
const { useState } = React;

export function BookPreview({ book }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = () => setIsExpanded((prev) => !prev);
  const details = isExpanded ? (
    <BookDetails book={book} />
  ) : (
    <h2>{`Title: ${book.title}`}</h2>
  );
  return (
    <article className="book-preview">
      <img src={book.thumbnail} alt={"Book Image"} />
      <button onClick={toggle}>Expand</button>
      {details}
    </article>
  );
}
