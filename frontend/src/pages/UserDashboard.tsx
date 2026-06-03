import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  description: string;
};

export default function UserDashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const booksPerPage = 5;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get<Book[]>("/books");
        setBooks(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()),
    );
  }, [books, search]);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginatedBooks = filteredBooks.slice(
    (page - 1) * booksPerPage,
    page * booksPerPage,
  );

  const handleLogout = () => {
    localStorage.removeItem("token"); // or whatever you stored
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Available Books</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="border p-2 w-full mb-4"
      />

      {/* BOOK LIST */}
      <div className="grid gap-4">
        {paginatedBooks.map((book) => (
          <div key={book.id} className="border rounded p-4 shadow bg-white">
            <h3 className="font-bold text-lg">{book.title}</h3>

            <p>Author: {book.author}</p>

            <p>Published: {book.publishedYear}</p>

            <Link
  to={`/books/${book.id}`}
  className="inline-block mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
>
  View More
</Link>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
