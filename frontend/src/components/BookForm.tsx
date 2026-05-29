import { useState } from 'react';
import api from '../services/api';

interface Props {
  onRefresh: () => void;
}

const BookForm = ({ onRefresh }: Props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishedYear, setPublishedYear] = useState<number>(2024);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post('/books', {
      title,
      author,
      isbn,
      publishedYear,
      description,
    });

    setTitle('');
    setAuthor('');
    setIsbn('');
    setPublishedYear(2024);
    setDescription('');

    onRefresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full" />
      <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} className="border p-2 w-full" />
      <input placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} className="border p-2 w-full" />
      <input type="number" placeholder="Published Year" value={publishedYear} onChange={(e) => setPublishedYear(Number(e.target.value))} className="border p-2 w-full" />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full" />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Book
      </button>
    </form>
  );
};

export default BookForm;