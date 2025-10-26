'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export const _queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 1000,
    },
  },
});

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={_queryClient}>
      {children}
    </QueryClientProvider>
  );
}
