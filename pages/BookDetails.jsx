const { useState, useEffect } = React;
const { useParams, useNavigate } = ReactRouter;
const { Link } = ReactRouterDOM;

import { LongText } from "../cmps/LongText.jsx";
import { bookService } from "../services/bookService.js";

export function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadBook();
  }, [params.bookId]);

  function loadBook() {
    setIsLoading(true);
    bookService
      .get(params.bookId)
      .then(setBook)
      .catch(() => navigate(`/book`))
      .finally(() => setIsLoading(false));
  }

  function getBookDateLevel() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currYearDiff = currentYear - book.publishedDate;
    return currYearDiff > 10 ? "Vintage Book" : "New Book";
  }

  function bookReadingLevel() {
    if (book.pageCount > 500) return "Serious Reading";
    if (book.pageCount > 200) return "Descent Reading";
    return "Light Reading";
  }

  if (isLoading) return <div className="loader"></div>;

  const {
    title,
    listPrice,
    language,
    authors,
    categories,
    description,
    thumbnail,
    prevBookId,
    nextBookId,
  } = book;

  const priceClass = listPrice.amount > 200 ? "high-price" : "low-price";
  return (
    <article className="book-details">
      <nav className="book-details-nav">
        <Link to={`/book/${prevBookId}`}>
          <button>{"<-"}</button>
        </Link>
        <Link to={`/book/${nextBookId}`}>
          <button>{"->"}</button>
        </Link>
      </nav>
      <button onClick={() => navigate(`../book/edit/${params.bookId}`)}>Go to editing</button>
      <h2>{title}</h2>
      <span>{getBookDateLevel()}</span>
      <h4>{bookReadingLevel()}</h4>

      <img className="book-img" src={thumbnail} alt="" />

      <p className={priceClass}>
        <span className="bold-txt">Price: </span>
        {listPrice.amount} {listPrice.currencyCode}
      </p>
      <p>
        <span className="bold-txt">Language:</span>
        {language}
      </p>
      {categories && (
        <p>
          <span className="bold-txt">Categoric:</span> {categories}
        </p>
      )}
      {authors && (
        <p>
          <span className="bold-txt">Authors:</span> {authors}
        </p>
      )}
      {description && <LongText>{description}</LongText>}
      {listPrice.isOnSale && (
        <img
          className="on-sale-icon"
          src={"https://cdn.example.com/images/not-found.png"}
          alt=""
        />
      )}
      <button className="close" onClick={() => navigate("/book")}>
        Go back to book list
      </button>
    </article>
  );
}
