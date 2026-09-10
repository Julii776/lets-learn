'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

export const QueryProvider = ({ children }: PropsWithChildren) => {
  const client = new QueryClient({
    defaultOptions: {},
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
