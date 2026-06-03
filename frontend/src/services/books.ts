import api from "./api";

// GET all book
export const getBooks = async () => {
  const response = await api.get("/books");
  return response.data;
};

// GET single book
export const getBook = async (id: number) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

// CREATE book
export const createBook = async (data: {
  title: string;
    author: string;
    isbn: string;
    description: string;
    publishedYear: number;
}) => {
  const response = await api.post("/books", data);
  return response.data;
};

// UPDATE book
export const updateBook = async (
  id: number,
  data: {
    title: string;
    author: string;
    isbn: string;
    description: string;
    publishedYear: number;
  }
) => {
  const response = await api.put(`/books/${id}`, data);
  return response.data;
};

// DELETE book
export const deleteBook = async (id: number) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};