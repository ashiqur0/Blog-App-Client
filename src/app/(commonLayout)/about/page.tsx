'use client';

import { getBlogs } from "@/actions/blog.action";
import { useEffect, useState } from "react";

// ex: make the page dynamic
export const dynamic = "force-dynamic";

const AboutPage = () => {

    //  new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
    // throw new Error("Failed to load about page"); // Simulate an error

    const [data, setData] = useState();
    const [error, setError] = useState<{ message: string } | null>(null);
    console.log(data);
    console.log(error);

    useEffect(() => {
        (async () => {
            const { data } = await getBlogs();
            setData(data);
            setError(null);
        })();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold underline">About Us</h1>
            <p>This is the about page.</p>
        </div>
    );
};

export default AboutPage;