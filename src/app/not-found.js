'use client';

import { Suspense } from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '60vh',
        padding: '2rem' 
      }}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href="/" style={{ 
          marginTop: '2rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#4a4a4a',
          color: 'white',
          borderRadius: '4px',
          textDecoration: 'none'
        }}>
          Return to Home
        </Link>
      </div>
    </Suspense>
  );
}