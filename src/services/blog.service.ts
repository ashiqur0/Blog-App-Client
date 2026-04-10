// import error from "@/app/(commonLayout)/about/error";
import { env } from "@/env"
import { cookies } from "next/headers";

const API_URL = env.API_URL;

//* SSG: { cache: "no-store" }
//* ISR: { next: { revalidate: 10 } } --> Mixed between SSG and SSR

interface ServiceOptions {
    chache?: RequestCache;
    revalidate?: number;
}

interface GetBlogsParams {
    isFeatured?: boolean;
    search?: string;
}

export interface BlogData {
    title: string;
    content: string;
    tags?: string[];
}

export const blogService = {
    getBlogPosts: async (params?: GetBlogsParams, options?: ServiceOptions) => {
        try {
            const url = new URL(`${API_URL}/posts`);
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== '') {
                        url.searchParams.append(key, String(value));
                    }
                })
            }

            const config: RequestInit = {};
            if (options?.chache) {
                config.cache = options.chache;
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate };
            }

            config.next = { ...config.next, tags: ['blogPosts'] };

            // const res = await fetch(url.toString(), {
            //     next: {
            //         tags: ['blogPosts']
            //     }
            // });

            const res = await fetch(url.toString(), config);
            const data = await res.json();
            return { data: data.data, error: null };
        } catch (error) {
            return {
                data: null, error: { message: "Failed to fetch blog posts", error }
            }
        }
    },

    getBlogById: async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/posts/${id}`);
            const data = await res.json();
            return { data: data.data, error: null };
        } catch (error) {
            return { data: null, error: { message: "Failed to fetch blog post", error } };
        }
    },

    createBlogPost: async (blogData: BlogData) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(blogData)
            });

            const data = await res.json();

            if (data.error) {
                return { data: null, error: { message: data.error.message } };
            }
            
            return { data: data.data, error: null };
        } catch (error) {
            return { data: null, error: { message: "Failed to create blog post", error } };
        }
    }
}