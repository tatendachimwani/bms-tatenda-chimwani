import { useEffect, useState } from "react";
import api from "../services/api";

type Book = {
  id: string;
  title: string;
};

export default function UserDashboard() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    api.get<Book[]>("/books").then((res) => setBooks(res.data));
  }, []);

  return (
    <div>
      <h2>Available Books</h2>

      {books.map((b) => (
        <div key={b.id}>
          {b.title}
        </div>
      ))}
    </div>
  );
}