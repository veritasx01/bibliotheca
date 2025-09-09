import { bookService } from "../services/bookService.js";
const { useState, useEffect } = React;
const { useParams } = ReactRouter;

export function ReviewsList({ reviews, onDelete }) {
  if (!reviews) reviews = [];
  
  return (
    <section className="reviews-list">
      <h1>Reviews List:</h1>
      <ul>
        {reviews.map((rev, idx) => {
          return (
            <li key={rev.id}>
              <p>{`full name: ${rev.fullName}
                   rating: ${rev.rating}
                   read at: ${rev.date}`}</p>
              <button onClick={(event) => onDelete(event,rev.id)}>remove</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
