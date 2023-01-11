import { QueryClient } from "@tanstack/react-query";

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60000,
        cacheTime: 60000,
        retry: 1,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        // staleTime: Infinity,
        // cacheTime: 5000,
        // ...(isDevEnv && { retry: 0 }),
      },
    },
  });
};
