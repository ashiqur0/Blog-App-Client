import React from 'react';

export const dynamic = "force-dynamic";

const AboutPage = async () => {

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay

    // throw new Error("Failed to load about page"); // Simulate an error

    return (
        <div>
            <h1 className="text-3xl font-bold underline">About Us</h1>
            <p>This is the about page.</p>
        </div>
    );
};

export default AboutPage;