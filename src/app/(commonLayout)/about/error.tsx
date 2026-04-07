"use client";

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const AboutError = ({
    error,
    reset
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) => {

    useEffect(() => {
        // we can pass the error to a logger
        console.error("Error loading about page:", error);
    }, [error]);

    return (
        <div>
            <h1>Error</h1>
            <p>Failed to load about page.</p>
            <Button onClick={reset}>Re-try</Button>
        </div>
    );
};

export default AboutError;