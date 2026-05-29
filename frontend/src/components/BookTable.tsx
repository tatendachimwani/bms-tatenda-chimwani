import api from '../services/api';
import Book  from '../types/book';

interface Props {
  books: Book[];
  onRefresh: () => void;
}

const BookTable = ({ books, onRefresh }: Props) => {
  const deleteBook = async (id: number) => {
    await api.delete(`/books/${id}`);
    onRefresh();
  };

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th className="border p-2">Title</th>
          <th className="border p-2">Author</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td className="border p-2">{book.title}</td>
            <td className="border p-2">{book.author}</td>
            <td className="border p-2">
              <button
                onClick={() => deleteBook(book.id)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;