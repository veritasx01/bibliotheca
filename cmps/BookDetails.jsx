export function BookDetails({ book }) {
  console.log(book);
  const priceStr = `${book.listPrice.amount} ${book.listPrice.currencyCode}
        ${book.listPrice.isOnSale ? " (On Sale)" : ""}`;
  return (
    <article className="book-details debug">
      <h2>{"Title: " + book.title}</h2>
      <h3>{"Book subtitle: " + book.subtitle}</h3>
      <p> {"Authors: " + book.authors}</p>
      <p> {"Published date: " + book.publishedDate}</p>
      <p> {"Description: " + book.description}</p>
      <p> {"Page count: " + book.pageCount} pages</p>
      <p> {"Categories: " + book.categories}</p>
      <p> {"Language: " + book.language}</p>
      <p>{priceStr}</p>
    </article>
  );
}
