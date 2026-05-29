import { useEffect, useState } from 'react';
import api from '../services/api';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  description: string;
}

interface Props {
  book: Book | null;
  onClose: () => void;
  onRefresh: () => void;
}

const createInitialForm = (book?: Book) => ({
  title: book?.title || '',
  author: book?.author || '',
  isbn: book?.isbn || '',
  publishedYear: book?.publishedYear || 2024,
  description: book?.description || '',
});

const EditBookForm = ({ book, onClose, onRefresh }: Props) => {
  const [form, setForm] = useState(createInitialForm(book ?? undefined));

  // ✅ FIX: sync when book changes
  useEffect(() => {
    if (!book) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm(createInitialForm(book));
  }, [book]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!book) return;

    await api.put(`/book/${book.id}`, form);

    onRefresh();
    onClose();
  };

  if (!book) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">Edit Book</h2>

        <form onSubmit={handleUpdate} className="space-y-3">
          <input name="title" className="border p-2 w-full" value={form.title} onChange={handleChange} />
          <input name="author" className="border p-2 w-full" value={form.author} onChange={handleChange} />
          <input name="isbn" className="border p-2 w-full" value={form.isbn} onChange={handleChange} />
          <input name="publishedYear" type="number" className="border p-2 w-full" value={form.publishedYear} onChange={handleChange} />
          <textarea name="description" className="border p-2 w-full" value={form.description} onChange={handleChange} />

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Close
            </button>

            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookForm;