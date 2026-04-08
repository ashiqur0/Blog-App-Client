//client component
// import { useParams } from 'next/navigation';
import React from 'react';

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {

    // const {id} = useParams();
    const { id } = await params;

    return (
        <div>
            <h1>This is a dynamic page</h1>
            <p>Blog ID: {id}</p>
        </div>
    );
};

export default BlogPage;