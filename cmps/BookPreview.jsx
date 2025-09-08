import { BookData } from "./BookData.jsx";
const { useState } = React;
const { useNavigate } = ReactRouterDOM;

export function BookPreview({ book, onRemove }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const toggle = () => setIsExpanded((prev) => !prev);
  const details = isExpanded ? (
    <BookData book={book} />
  ) : (
    <h2>{`Title: ${book.title}`}</h2>
  );
  return (
    <article className="book-preview">
      <img src={book.thumbnail} alt={"Book Image"} />
      <button onClick={toggle}>Expand</button>
      <button onClick={() => onRemove(book.id)}>Remove</button>
      <button onClick={() => navigate(`edit/${book.id}`)}>Details</button>
      {details}
    </article>
  );
}
