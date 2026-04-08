import { env } from "@/env"

const API_URL = env.API_URL;

//* SSG: { cache: "no-store" }
//* ISR: { next: { revalidate: 10 } } --> Mixed between SSG and SSR
export const blogService = {
    getBlogPosts: async () => {
        try {
            // const res = await fetch(`${API_URL}/posts`, { cache: "no-store" });
            const res = await fetch(`${API_URL}/posts`, { next: { revalidate: 10 } });
            const data = await res.json();
            return { data, error: null };
        } catch (error) {
            return {
                data: null, error: { message: "Failed to fetch blog posts", error }
            }
        }
    }
}