import { useEffect, useState } from 'react';
import api from '../services/api';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  publishedYear: number;
}

const Book = () => {
  const [book, setBooks] = useState<Book[]>([]);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');
  const [publishedYear, setPublishedYear] = useState('');

  // 📚 GET BOOKS
  const fetchBooks = async () => {
    try {
      const res = await api.get('/book');
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ LOAD BOOKS
  useEffect(() => {
  const loadBooks = async () => {
    await fetchBooks();
  };

  loadBooks();
}, [])

  // ➕ ADD BOOK
  const addBook = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title ||
      !author ||
      !isbn ||
      !description ||
      !publishedYear
    ) {
      return;
    }

    try {
      await api.post('/book', {
        title,
        author,
        isbn,
        description,
        publishedYear: Number(publishedYear),
      });

      // clear form
      setTitle('');
      setAuthor('');
      setIsbn('');
      setDescription('');
      setPublishedYear('');

      fetchBooks();
    } catch (error) {
      console.error(error);
    }
  };

  // ❌ DELETE BOOK
  const deleteBook = async (id: string) => {
    try {
      await api.delete(`/book/${id}`);
      fetchBooks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Books Management
      </h1>

      {/* FORM */}
      <form onSubmit={addBook} className="mb-6 space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Published Year"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Book
        </button>
      </form>

      {/* TABLE */}
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">ISBN</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {book.map((book) => (
            <tr key={book.id}>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.isbn}</td>
              <td className="border p-2">
                {book.publishedYear}
              </td>

              <td className="border p-2">
                <button
                  onClick={() => deleteBook(book.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Book;