import { BookDetails } from "./BookDetails.jsx";
const { useState } = React;

export function BookPreview({ book }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = () => setIsExpanded((prev) => !prev);
  if (isExpanded) {
    return (
      <article className="book-preview">
        <img src={book.thumbnail} alt={"IMAGE"} />
        <button onClick={toggle}>Collapse</button>
        <BookDetails book={book} />
      </article>
    );
  }
  return (
    <article className="book-preview">
      <img src={book.thumbnail} alt={"IMAGE"} />
      <button onClick={toggle}>Expand</button>
      <h2>{"Title: " + book.title}</h2>
    </article>
  );
}
