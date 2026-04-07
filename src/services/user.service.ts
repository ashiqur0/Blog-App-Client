import { cookies } from "next/headers";

export const userService = {
    getSession: async function () {
        try {
            // grab the browser cookies
            const cookieStore = await cookies();

            // get session from the server using the cookies
            const res = await fetch("http://localhost:5000/api/auth/get-session", {
                headers: {
                    Cookie: cookieStore.toString()
                },
                cache: "no-store"
            });

            const session = await res.json();

            if (session === null) {
                return {
                    data: null, error: { message: "No active session" }
                }
            }
            return {
                data: session,
                error: null
            };
        } catch (error) {
            console.error(error);
            return {
                data: null,
                error: { message: "Failed to fetch session" }
            }
        }
    }
}