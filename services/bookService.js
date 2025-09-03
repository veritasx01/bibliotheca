import { utilService } from './util.js';
import { storageService } from './asyncStorageService.js';
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

const BOOK_KEY = 'BookKey';

export const bookService = {
  query,
  createBooks,
  getEmptyFilter,
  save,
};

export function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, 'i');
      books = books.filter((book) => regExp.test(book.title));
    }
    if (filterBy.amount) {
      const parsedAmount = parseInt(filterBy.amount);
      books = books.filter((book) => book.listPrice.amount <= parsedAmount);
    }
    return books;
  });
}

export function save(books) {
  localStorage.setItem(BOOK_KEY, JSON.stringify(books));
}

export function getEmptyFilter() {
  return { title: '', pageCount: '' };
}

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
      thumbnail: `https://www.coding-academy.org/books-photos/${
        1 + (i % 20)
      }.jpg`,
      language: 'en',
      listPrice: {
        amount: utilService.getRandomIntInclusive(15, 250),
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.7,
      },
    };
    books.push(book);
  }
  console.log(books);
  return books;
}

export const dummyBooks = [
  {
    id: '6ThQdu',
    title: 'the color burn',
    subtitle: 'a different story a pleasure bit by bit a pleasure',
    authors: ['a pleasure'],
    publishedDate: 2021,
    description:
      'each time of nature the story was the port each time and All burn from various people The sky of nature All to The sky the story was happens each time in such cases',
    pageCount: 456,
    categories: ['Religion'],
    thumbnail: 'https://www.coding-academy.org/books-photos/1.jpg',
    language: 'en',
    listPrice: {
      amount: 204,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'KmqC2w',
    title: 'in such cases was',
    subtitle: 'was in such cases bit by bit The sky',
    authors: ['burn'],
    publishedDate: 1984,
    description:
      'the story in such cases was as generally of nature had in such cases The sky was each time each time it happens The sky The sky the color was as generally happens bit by bit',
    pageCount: 195,
    categories: ['Love'],
    thumbnail: 'https://www.coding-academy.org/books-photos/2.jpg',
    language: 'en',
    listPrice: {
      amount: 202,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'ZWQFU4',
    title: 'a pleasure a pleasure',
    subtitle: 'of nature a pleasure more or less All',
    authors: ['All'],
    publishedDate: 1975,
    description:
      'was The sky above was a pleasure was to tuned All The sky more or less the port the port happens I had a pleasure it a live channel I',
    pageCount: 461,
    categories: ['Computers'],
    thumbnail: 'https://www.coding-academy.org/books-photos/3.jpg',
    language: 'en',
    listPrice: {
      amount: 199,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: '8aZZIr',
    title: 'each time a pleasure',
    subtitle: 'All the color more or less was',
    authors: ['more or less'],
    publishedDate: 1957,
    description:
      'tuned of nature bit by bit and had and happens this happened above the color each time the color this happened as generally I tuned from various people a different story to happens',
    pageCount: 270,
    categories: ['Poetry'],
    thumbnail: 'https://www.coding-academy.org/books-photos/4.jpg',
    language: 'en',
    listPrice: {
      amount: 216,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'JwFT9p',
    title: 'as generally from various people',
    subtitle: 'tuned above and the port',
    authors: ['a pleasure'],
    publishedDate: 1994,
    description:
      'the story from various people happens All was to and happens this happened bit by bit each time above this happened each time tuned of nature more or less the story of nature above',
    pageCount: 23,
    categories: ['Fiction'],
    thumbnail: 'https://www.coding-academy.org/books-photos/5.jpg',
    language: 'en',
    listPrice: {
      amount: 230,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'gh0W73',
    title: 'the color a different story',
    subtitle: 'it was the story burn',
    authors: ['each time'],
    publishedDate: 1968,
    description:
      'as generally more or less above was the story a different story I a live channel this happened a different story the story the port a different story was the color had a live channel a live channel was burn',
    pageCount: 592,
    categories: ['Love'],
    thumbnail: 'https://www.coding-academy.org/books-photos/6.jpg',
    language: 'en',
    listPrice: {
      amount: 141,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'u1883c',
    title: 'bit by bit above',
    subtitle: 'I to I and',
    authors: ['The sky'],
    publishedDate: 1963,
    description:
      'the port it more or less each time was the color to All had this happened All the story All the color above a live channel The sky of nature each time The sky',
    pageCount: 103,
    categories: ['Fiction'],
    thumbnail: 'https://www.coding-academy.org/books-photos/7.jpg',
    language: 'en',
    listPrice: {
      amount: 148,
      currencyCode: 'EUR',
      isOnSale: true,
    },
  },
  {
    id: 'UAOPnl',
    title: 'tuned a live channel',
    subtitle: 'burn All the color the color',
    authors: ['a different story'],
    publishedDate: 1965,
    description:
      'was this happened a pleasure each time this happened in such cases was happens the port the port was burn the port had was the color the color a different story had from various people',
    pageCount: 526,
    categories: ['Fiction'],
    thumbnail: 'https://www.coding-academy.org/books-photos/8.jpg',
    language: 'en',
    listPrice: {
      amount: 48,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'YupWvn',
    title: 'of nature to',
    subtitle: 'more or less a live channel bit by bit happens',
    authors: ['I'],
    publishedDate: 1999,
    description:
      'was I bit by bit I this happened burn happens The sky the port the port All it to in such cases to and happens from various people the color in such cases',
    pageCount: 339,
    categories: ['Computers'],
    thumbnail: 'https://www.coding-academy.org/books-photos/9.jpg',
    language: 'en',
    listPrice: {
      amount: 206,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
  {
    id: 'h1wJIU',
    title: 'of nature each time',
    subtitle: 'and had each time of nature',
    authors: ['and'],
    publishedDate: 1994,
    description:
      'a different story above and The sky bit by bit I from various people from various people was it was the color tuned I burn was to from various people this happened happens',
    pageCount: 328,
    categories: ['Fiction'],
    thumbnail: 'https://www.coding-academy.org/books-photos/10.jpg',
    language: 'en',
    listPrice: {
      amount: 28,
      currencyCode: 'EUR',
      isOnSale: false,
    },
  },
];
