import api from "./api";

// GET all book
export const getBooks = async () => {
  const response = await api.get("/book");
  return response.data;
};

// GET single book
export const getBook = async (id: number) => {
  const response = await api.get(`/book/${id}`);
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
  const response = await api.post("/book", data);
  return response.data;
};

// UPDATE book
export const updateBook = async (
  id: string,
  data: {
    title: string;
    author: string;
    isbn: string;
    description: string;
    publishedYear: number;
  }
) => {
  const response = await api.put(`/book/${id}`, data);
  return response.data;
};

// DELETE book
export const deleteBook = async (id: string) => {
  const response = await api.delete(`/book/${id}`);
  return response.data;
};