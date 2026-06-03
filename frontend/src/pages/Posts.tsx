import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

type Post = {
  id: number;
  title: string;
  content: string;
};

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await api.get<Post[]>("/posts");
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Latest Posts
      </h1>

      {posts.map((post) => (
        <div
          key={post.id}
          className="border p-4 rounded mb-4"
        >
          <h2 className="text-xl font-semibold">
            {post.title}
          </h2>

          <p>{post.content}</p>
          <Link
  to={`/posts/${post.id}`}
  className="text-blue-600 font-medium"
>
  Read More →
</Link>
        </div>
      ))}
    </div>
  );
}