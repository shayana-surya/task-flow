import { initTRPC } from "@trpc/server";

// Cria a instância do tRPC que vou utilizar no backend
const t = initTRPC.create();

// Permite criar routers (conjunto de operações relacionadas)
export const router = t.router;
// Permite criar operações
export const publicProcedure = t.procedure;