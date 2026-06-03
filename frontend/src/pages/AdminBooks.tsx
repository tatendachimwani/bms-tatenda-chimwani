import {  useState } from "react";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../services/books";
import { useEffect } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  publishedYear: number;
  description: string;
  isbn: string;
};

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [isbn, setIsbn] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  console.log("AdminBooks mounted");

useEffect(() => {
  console.log("useEffect running");
}, []);

  // 🔄 fetch book
  const fetchBooks = async () => {
  try {
    setLoading(true);
    const data = await getBooks();
    setBooks(data);
  } catch (err) {
    console.error("FAILED TO FETCH BOOKS:", err);
  } finally {
    setLoading(false);
  }
};                    

useEffect(() => {
  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      console.log("BOOKS RESPONSE:", data);
      setBooks(data);
    } catch (err) {
      console.error("FAILED TO FETCH BOOKS:", err);
    } finally {
      setLoading(false);
    }
  };

  loadBooks();
}, []);

  // ➕ create or update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author || !isbn || !description || !publishedYear) return;

    const payload = {
      title,
      author,
      isbn,
      description,
      publishedYear: Number(publishedYear),
    };

    if (editingId) {
      await updateBook(editingId, payload);
    } else {
      await createBook(payload);
    }

    // reset form
    setTitle("");
    setAuthor("");
    setDescription("");
    setPublishedYear("");
    setIsbn("");
    setEditingId(null);

    fetchBooks();
  };

  // ✏️ edit
  const handleEdit = (book: Book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setDescription(book.description);
    setPublishedYear(String(book.publishedYear));
    setIsbn(book.isbn);
    setEditingId(book.id);
  };

  // ❌ delete
  const handleDelete = async (id: number) => {
    await deleteBook(id);
    fetchBooks();
  };

  return (
    <div className="space-y-6">
      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Edit Book" : "Add Book"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border p-2 rounded"
          />

          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            className="w-full border p-2 rounded"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />

          <input
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            placeholder="Published Year"
            className="w-full border p-2 rounded"
          />

          <input
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="ISBN"
            className="w-full border p-2 rounded"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingId ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Books List</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3">
            {books.map((b) => (
              <div
                key={b.id}
                className="border p-3 rounded flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{b.title}</h3>
                  <p className="text-sm text-gray-500">{b.author}</p>
                  <p className="text-sm text-gray-500">{b.description}</p>
                  <p className="text-sm text-gray-500">{b.publishedYear}</p>
                  <p className="text-sm text-gray-500">{b.isbn}</p>
                </div>

                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(b)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(b.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}