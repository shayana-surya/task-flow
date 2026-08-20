import "server-only";

import { cache } from "react";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { appRouter } from "@/server/api/root";
import { createQueryClient } from "@/server/api/query-client";

// Conecta o tRPC ao TanStack Query para permitir o uso da API no servidor.
export const getQueryClient = cache(createQueryClient);

export const trpc = createTRPCOptionsProxy({
  router: appRouter,
  ctx: {},
  queryClient: getQueryClient,
});