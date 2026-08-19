import { QueryClient } from "@tanstack/react-query";

// O QueryClient é quem gerencia o estado das consultas do React Query
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}