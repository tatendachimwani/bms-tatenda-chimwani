import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function PostDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get<Post>(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
        setError("Post not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error}</p>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
        >
          Back
        </button>
      </div>
    );
  }

  if (!post) {
    return <p className="p-6">No post found</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
      >
        Back
      </button>

      <div className="bg-white shadow rounded p-6">
        <h1 className="text-3xl font-bold mb-4">
          {post.title}
        </h1>

        <p className="text-sm text-gray-500 mb-4">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>

        <div className="whitespace-pre-wrap text-gray-700">
          {post.content}
        </div>
      </div>
    </div>
  );
}