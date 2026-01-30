"use server";

import { env } from "@/env";
import { revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

// No Dynamic and No {cache: 'no-store'} : SSG -> Static Site Generation
// With Dynamic and {cache: 'no-store'} : SSR -> Server Side Rendering
// next: { revalidate: 10 } : ISR -> Mix Between SSG and SSR

interface GetBlogsParams {
  page?: number;
  search?: string;
  sortBy?: string;
  isFeatured?: boolean;
  limit?: number;
  orderBy?: "asc" | "desc";
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface BlogPost {
  title: string;
  content: string;
  tags: string[];
  thumbnail?: string;
}

export const blogService = {
  getBlogPosts: async function (
    params?: GetBlogsParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/posts`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate !== undefined) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["blog-posts"] };

      console.log("Fetching blog posts from:", url.toString());
      console.log("Fetch config:", config);

      const res = await fetch(url.toString(), config);
      const posts = await res.json();
      console.log("Fetched blog posts:", posts);
      return posts;
    } catch (error: any) {
      console.error("Error fetching blog posts:", error);
      return { data: [], meta: null };
    }
  },

  getBlogById: async function (id: string) {
    try {
      const url = `${API_URL}/posts/${id}`;

      const res = await fetch(url);
      const post = await res.json();
      console.log("Fetched blog post:", post);
      return post;
    } catch (error: any) {
      console.error(`Error fetching blog post with id ${id}:`, error);
      return null;
    }
  },

  createPost: async (data: BlogPost) => {
    const cookieStore = await cookies();
    const response = await fetch("http://localhost:5050/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });
    if (response.ok) {
      revalidateTag("blog-posts", "max");
      updateTag("blog-posts");
    }
    if (!response.ok) {
      throw new Error("Failed to create post");
    }
    return response.json();
  },
};
