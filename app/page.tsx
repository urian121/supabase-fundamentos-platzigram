"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getTimeAgo } from "./utils/time";
import { type Post } from "./mocks/posts";
import Hearder from "./components/Hearder";
import UserAvatar from "./components/UserAvatar";
import { supabase } from "./utils/client";
import HomeSkeleton from "./components/skeletons/HomeSkeleton";

interface ApiUser {
  name: string;
  avatar_url: string;
}

function HeartIcon({ filled }: { filled: boolean }) {
  if (filled) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-7 h-7 text-red-500"
      >
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-7 h-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

function PostCard({
  post,
  fallbackUser,
  onLike,
}: {
  post: Post;
  fallbackUser: ApiUser;
  onLike: (id: number | string) => void;
}) {
  const displayName   = post.user?.username || fallbackUser.name;
  const displayAvatar = post.user?.avatar   || fallbackUser.avatar_url;

  return (
    <article className="bg-card-bg overflow-hidden">
      <div className="flex items-center gap-3 p-4">
        <UserAvatar src={displayAvatar} username={displayName} />
        <div className="flex flex-col">
          <span className="font-semibold text-foreground">{displayName}</span>
          <span className="text-xs text-foreground/50">
            {getTimeAgo(new Date(post.created_at))}
          </span>
        </div>
      </div>

      <div className="relative w-full aspect-square">
        <Image
          src={post.image_url}
          alt={`Post de ${displayName}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onLike(post.id)}
            className="hover:scale-110 transition-transform active:scale-95 hover:cursor-pointer"
            aria-label={post.isLiked ? "Quitar like" : "Dar like"}
          >
            <HeartIcon filled={post.isLiked || false} />
          </button>
          <span className="font-semibold text-foreground">
            {post.likes.toLocaleString()} likes
          </span>
        </div>

        <p className="mt-2 text-foreground">
          <span className="font-semibold">{displayName}</span>{" "}
          <span className="text-foreground/80">{post.caption}</span>
        </p>
      </div>
    </article>
  );
}

export default function Home() {
  const [posts, setPosts]         = useState<Post[]>([]);
  const [apiUsers, setApiUsers]   = useState<ApiUser[]>([]);
  const [loading, setLoading]     = useState(true);

  const handleLike = (postId: number | string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  useEffect(() => {
    const fetchAll = async () => {
      const [{ data: postsData, error }, usersRes] = await Promise.all([
        supabase.from("posts_new").select("*").order("created_at", { ascending: false }),
        fetch("https://devsapihub.com/api-users").then((r) => r.json()),
        new Promise((r) => setTimeout(r, 2000)),
      ]);

      if (error) console.error("Error al obtener los posts:", error);
      else setPosts(postsData);

      setApiUsers(usersRes);
      setLoading(false);
    };

    fetchAll();
  }, []);

  const getUser = (index: number): ApiUser =>
    apiUsers[index % apiUsers.length] ?? { name: "Usuario", avatar_url: "" };

  return (
    <div className="min-h-screen bg-background">
      <Hearder title="Suplatzigram" />

      <main className="max-w-lg mx-auto px-4 py-6">
        {loading ? (
          <HomeSkeleton />
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                fallbackUser={getUser(index)}
                onLike={handleLike}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
