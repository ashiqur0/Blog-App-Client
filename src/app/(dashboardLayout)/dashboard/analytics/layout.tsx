import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const AnalyticsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Button asChild><Link href="/dashboard/analytics/monthly">Monthly</Link></Button>
            <Button asChild><Link href="/dashboard/analytics/weekly">Weekly</Link></Button>
            {children}
        </div>
    );
};

export default AnalyticsLayout;