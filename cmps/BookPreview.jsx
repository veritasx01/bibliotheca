const { useState } = React;
const { useNavigate } = ReactRouterDOM;

export function BookPreview({ book, onRemove }) {
  const navigate = useNavigate();
  const details = (
    <p>{`${book.title}`}</p>
  );
  return (
    <article className="book-preview">
      <img src={book.thumbnail} alt={"Book Image"} />
      <button onClick={() => onRemove(book.id)}>X</button>
      <button onClick={() => navigate(`${book.id}`)}><i className="fa-solid fa-circle-info"></i></button>
      {details}
    </article>
  );
}
