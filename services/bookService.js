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
  "isOnSale": false
}
*/

export function dummyBookData() {
  return [
    {
      id: '9780142437247',
      title: 'Moby-Dick',
      authors: ['Herman Melville'],
      publishedDate: 1851,
      pageCount: 635,
      categories: ['Fiction', 'Classic Literature'],
      language: 'en',
      listPrice: {
        amount: 12.99,
        currencyCode: 'USD',
        isOnSale: false,
      },
    },
    {
      id: '9780061120084',
      title: 'To Kill a Mockingbird',
      authors: ['Harper Lee'],
      publishedDate: 1960,
      pageCount: 324,
      categories: ['Fiction', 'Historical Fiction'],
      language: 'en',
      listPrice: {
        amount: 14.99,
        currencyCode: 'USD',
        isOnSale: true,
      },
    },
    {
      id: '9780140449136',
      title: 'The Odyssey',
      authors: ['Homer'],
      publishedDate: -800,
      pageCount: 541,
      categories: ['Fiction', 'Epic Poetry'],
      language: 'el',
      listPrice: {
        amount: 11.99,
        currencyCode: 'USD',
        isOnSale: false,
      },
    },
  ];
}

function _createBooks() {
  constctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion'];
  constbooks = [];
  for (let i = 0; i < 20; i++) {
    constbook = {
      id: utilService.makeId(),
      title: utilService.makeLorem(2),
      subtitle: utilService.makeLorem(4),
      authors: [utilService.makeLorem(1)],
      publishedDate: utilService.getRandomIntInclusive(1950, 2024),
      description: utilService.makeLorem(20),
      pageCount: utilService.getRandomIntInclusive(20, 600),
      categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
      thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
      language: 'en',
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.7,
      },
    };
    books.push(book);
  }
  console.log('books', books);
}
