"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { type Post } from "./mocks/posts";
import Hearder from "./components/Hearder";
import PostCard, { type ApiUser } from "./components/PostCard";
import HomeSkeleton, { PostCardSkeleton } from "./components/skeletons/HomeSkeleton";
import { supabase } from "./utils/client";

const PAGE_SIZE = 5;

export default function Home() {
  const [posts, setPosts]       = useState<Post[]>([]);
  const [apiUsers, setApiUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading]   = useState(true);
  const [hasMore, setHasMore]   = useState(true);
  const offset                  = useRef(0);
  const isFetching              = useRef(false);

  const handleLike = (postId: number | string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const loadPosts = useCallback(async (from: number) => {
    if (isFetching.current) return;
    isFetching.current = true;

    const { data, error } = await supabase
      .from("posts_new")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      console.error("Error al obtener posts:", error);
      isFetching.current = false;
      return;
    }

    if (data.length < PAGE_SIZE) setHasMore(false);
    setPosts((prev) => [...prev, ...data]);
    offset.current = from + data.length;
    isFetching.current = false;
  }, []);

  useEffect(() => {
    const init = async () => {
      const [usersRes] = await Promise.all([
        fetch("https://devsapihub.com/api-users").then((r) => r.json()),
        loadPosts(0),
        new Promise((r) => setTimeout(r, 2000)),
      ]);
      setApiUsers(usersRes);
      setLoading(false);
    };
    init();
  }, [loadPosts]);

  const fetchMore = () => loadPosts(offset.current);

  const getUser = (index: number): ApiUser =>
    apiUsers[index % apiUsers.length] ?? { name: "Usuario", avatar_url: "" };

  return (
    <div className="min-h-screen bg-background">
      <Hearder title="Suplatzigram" />

      <main className="max-w-lg mx-auto px-4 py-6">
        {loading ? (
          <HomeSkeleton />
        ) : (
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMore}
            hasMore={hasMore}
            scrollThreshold={0.85}
            loader={
              <div className="mt-6">
                <PostCardSkeleton />
              </div>
            }
            endMessage={
              <p className="text-center text-foreground/40 text-sm py-6">
                Ya viste todos los posts
              </p>
            }
            className="flex flex-col gap-6"
          >
            {posts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                fallbackUser={getUser(index)}
                onLike={handleLike}
              />
            ))}
          </InfiniteScroll>
        )}
      </main>
    </div>
  );
}
