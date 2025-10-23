"use client";

import { useEffect, useState } from "react";

export default function BlogsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/devto");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-screen mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Top Dev.to Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        posts.map((post, idx) => (
          <a
            key={idx}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-4 p-4 border rounded-lg hover:shadow-md"
          >
            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="mb-2 w-full rounded"
              />
            )}
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p className="text-gray-600">{post.description}</p>
            <p className="text-sm text-gray-400 mt-1">By: {post.user}</p>
            <p className="text-sm text-gray-400">
              Published: {new Date(post.published_at).toLocaleDateString()}
            </p>
          </a>
        ))
      )}
    </div>
  );
}
