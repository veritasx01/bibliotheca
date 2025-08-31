import { utilService } from "./util.js";
/*
full data model example

{
  "id": "OXeMG8wNskc",
  "title": "metus hendrerit",
  "subtitle": "mi est eros dapibus himenaeos",
  "authors": ["Barbara Cartland"],
  "publishedDate": 1999,
  "description": "placerat nisi sodales suscipit tellus",
  "pageCount": 713,
  "categories": ["Computers","Hack"],
  "thumbnail": "http://ca.org/books-photos/20.jpg",
  "language": "en",
  "listPrice": {"amount": 109,
  "currencyCode": "EUR",
  "isOnSale": false}
}
*/

export function createBooks(amount) {
  const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion'];
  const books = [];
  for (let i = 0; i < amount; i++) {
    const book = {
      id: utilService.makeId(),
      title: utilService.makeLorem(2),
      subtitle: utilService.makeLorem(4),
      authors: [utilService.makeLorem(1)],
      publishedDate: utilService.getRandomIntInclusive(1950, 2024),
      description: utilService.makeLorem(20),
      pageCount: utilService.getRandomIntInclusive(20, 600),
      categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
      thumbnail: `https://www.coding-academy.org/books-photos/${1+i%20}.jpg`,
      language: 'en',
      listPrice: {
        amount: utilService.getRandomIntInclusive(15, 250),
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.7,
      },
    };
    books.push(book);
  }
  return books;
}
