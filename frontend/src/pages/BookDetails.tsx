import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  description: string;
};

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log("Fetching book:", id);

        const res = await api.get(`/books/${id}`);

        console.log(res.data);

        setBook(res.data);
      } catch (err) {
        console.error(err);
        setError("Book not found");
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error}</p>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-3 py-1 rounded mt-4"
        >
          Back
        </button>
      </div>
    );
  }

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-500 text-white px-3 py-1 rounded mb-4"
      >
        Back
      </button>

      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Published: {book.publishedYear}</p>
      <p>{book.description}</p>
    </div>
  );
}