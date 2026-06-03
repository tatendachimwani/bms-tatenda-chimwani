import { useEffect, useState } from "react";
import api from "../services/api";

type Post = {
  id: number;
  title: string;
  content: string;
};

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const loadPosts = async () => {
    try {
      const res = await api.get<Post[]>("/posts");
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      await loadPosts();
    };

    fetchPosts();
  }, []);

  const createPost = async () => {
    try {
      await api.post("/posts", {
        title,
        content,
      });

      setTitle("");
      setContent("");

      loadPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id: number) => {
    try {
      await api.delete(`/posts/${id}`);
      loadPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Posts</h2>

      <input
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <textarea
        placeholder="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={createPost}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Create Post
      </button>

      <div className="mt-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border p-4 rounded mb-3"
          >
            <h3 className="font-bold">{post.title}</h3>
            <p>{post.content}</p>

            <button
              onClick={() => deletePost(post.id)}
              className="bg-red-600 text-white px-3 py-1 rounded mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}