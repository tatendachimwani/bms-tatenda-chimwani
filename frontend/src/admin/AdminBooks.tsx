import { useEffect, useState } from "react";
import api from "../services/api";

type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  isbn: string;
  publishedYear: number;
};

export default function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishedYear, setPublishedYear] = useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  // 📚 LOAD BOOKS
  const fetchBooks = async () => {
    const res = await api.get<Book[]>("/books");
    setBooks(res.data);
  };

  useEffect(() => {
  const loadBooks = async () => {
    try {
      const res = await api.get<Book[]>("/books");
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  void loadBooks();
}, []);

  // ➕ CREATE / ✏️ UPDATE
  const submitBook = async () => {
    const payload = {
      title,
      author,
      description,
      isbn,
      publishedYear: Number(publishedYear),
    };

    try {
      if (editingId) {
        await api.put(`/books/${editingId}`, payload);
      } else {
        await api.post("/books", payload);
      }

      // RESET FORM
      setTitle("");
      setAuthor("");
      setDescription("");
      setIsbn("");
      setPublishedYear("");
      setEditingId(null);

      fetchBooks();
    } catch (error) {
      console.error(error);
    }
  };

  // ✏️ EDIT
  const editBook = (book: Book) => {
    setEditingId(book.id);

    setTitle(book.title);
    setAuthor(book.author);
    setDescription(book.description);
    setIsbn(book.isbn);
    setPublishedYear(
      String(book.publishedYear),
    );
  };

  // ❌ DELETE
  const deleteBook = async (id: number) => {
    await api.delete(`/books/${id}`);
    fetchBooks();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Books Management
      </h2>

      {/* FORM */}
      <div className="bg-white shadow rounded p-6 mb-8">
        <div className="grid gap-4">

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) =>
              setAuthor(e.target.value)
            }
            className="border p-2 rounded"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) =>
              setIsbn(e.target.value)
            }
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Published Year"
            value={publishedYear}
            onChange={(e) =>
              setPublishedYear(e.target.value)
            }
            className="border p-2 rounded"
          />

          <button
            onClick={submitBook}
            className="bg-blue-600 text-white py-2 rounded"
          >
            {editingId
              ? "Update Book"
              : "Add Book"}
          </button>
        </div>
      </div>

      {/* BOOKS LIST */}
      <div className="grid gap-4">
        {books.map((b) => (
          <div
            key={b.id}
            className="bg-white shadow rounded p-4 flex justify-between items-start"
          >
            <div>
              <h3 className="text-lg font-bold">
                {b.title}
              </h3>

              <p>
                <strong>Author:</strong>{" "}
                {b.author}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {b.description}
              </p>

              <p>
                <strong>ISBN:</strong>{" "}
                {b.isbn}
              </p>

              <p>
                <strong>Year:</strong>{" "}
                {b.publishedYear}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => editBook(b)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteBook(b.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}