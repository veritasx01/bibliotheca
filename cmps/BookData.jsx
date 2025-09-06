import { LongText } from "./LongText.jsx";

export function BookData({ book }) {
  const listPrice = book.listPrice;
  const priceStr = getPriceStr(
    listPrice.amount,
    listPrice.currencyCode,
    listPrice.isOnSale
  );
  const readingAmount = getReadingAmount(book.pageCount);
  const ageClass = getAgeClass(book.publishedDate);

  return (
    <article className="book-details">
      <h2>{`Title: ${book.title}`}</h2>
      <h3>{`Book subtitle: ${book.subtitle}`}</h3>
      <p> {`Authors: ${book.authors}`}</p>
      <p> {`Published date: ${book.publishedDate} ${ageClass}`}</p>
      <LongText>{`Description: ${book.description}`}</LongText>
      <p> {`Page count: ${book.pageCount} ${readingAmount}`} </p>
      <p> {`Categories: ${book.categories}`}</p>
      <p> {`Language: ${book.language}`}</p>
      <p>{priceStr}</p>
    </article>
  );
}

function getReadingAmount(pageCount) {
  if (pageCount > 500) {
    return "(Serious Reading)";
  }
  if (pageCount > 200) {
    return "(Decent Reading)";
  }
  if (pageCount < 100) {
    return "(Light Reading)";
  }
  return "";
}

function getAgeClass(publishedDate) {
  const currentYear = new Date().getFullYear();
  const diff = currentYear - publishedDate;
  if (diff > 10) {
    return "(Vintage)";
  }
  if (diff === 0) {
    return "(new)";
  }
  return "";
}

function getPriceStr(amount, currencyCode, isOnSale) {
  const saleStr = isOnSale ? " (On Sale)" : "";
  let amountStr = amount;
  if (amountStr > 150) {
    amountStr = <span style={{ color: "red" }}>{amountStr}</span>;
  } else if (amountStr < 20) {
    amountStr = <span style={{ color: "green" }}>{amountStr}</span>;
  }
  return (
    <span>
      {amountStr} {currencyCode} {saleStr}
    </span>
  );
}
