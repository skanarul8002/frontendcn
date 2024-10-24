import React, { useEffect, useState } from "react";
import axios from "axios";

const ChanakyaBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=chanakya+OR+arthashastra+OR+kautilya"
      );

      const fetchedBooks = response.data.items.map((book) => ({
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        thumbnail: book.volumeInfo.imageLinks?.thumbnail,
        link: book.volumeInfo.previewLink,
      }));

      setBooks(fetchedBooks);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to fetch books. Please try again later.");
      setLoading(false);
    }
  };

  const cardStyle = window.matchMedia("(max-width: 992px)").matches
    ? { width: "90%" }
    : { width: "20rem" };
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Books on Chanakya & Arthashastra</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {books.map((book, index) => (
          <div key={index} className="col">
            <div className="card h-100 shadow-sm" style={{ ...cardStyle }}>
              {book.thumbnail && (
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "contain" }}
                />
              )}
              <div className="card-body" style={{ padding: "10px" }}>
                <h5 className="card-title" style={{ fontSize: "1rem" }}>
                  {book.title}
                </h5>
                {book.authors && (
                  <p className="card-text" style={{ fontSize: "0.9rem" }}>
                    By: {book.authors.join(", ")}
                  </p>
                )}
                {book.description && (
                  <p className="card-text" style={{ fontSize: "0.85rem" }}>
                    {book.description.substring(0, 80)}...
                  </p>
                )}
              </div>
              <div className="card-footer" style={{ padding: "8px" }}>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-100"
                  style={{ fontSize: "0.9rem", padding: "6px" }}
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChanakyaBook;
