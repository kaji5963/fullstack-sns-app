import React, { useEffect, useState } from "react";
import { Post } from "./Post";
import apiClient from "@/lib/apiClient";
import { PostType } from "@/types/types";

export const Timeline = () => {
  const [postText, setPostText] = useState<string>("");

  const [latestPosts, setLatestPosts] = useState<PostType[]>([]);

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (postText === "") return;

      const newPost = await apiClient.post("/posts/post", {
        content: postText,
      });
      setLatestPosts((prevPosts) => [newPost.data, ...prevPosts]);
      setPostText("");
    } catch (error) {
      alert("ログインしてください");
    }
  };

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await apiClient.get("/posts/get_latest_post");
        setLatestPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={handlePost}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
              value={postText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPostText(e.target.value)
              }
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
            >
              投稿
            </button>
          </form>
        </div>
        {latestPosts.map((post: PostType) => {
          return <Post key={post.id} post={post} />;
        })}
      </main>
    </div>
  );
};
