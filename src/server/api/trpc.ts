import { initTRPC } from "@trpc/server";
import superjson from "superjson";

// Cria a instância do tRPC que vou utilizar no backend
const t = initTRPC.create({ transformer: superjson });

// Permite criar routers (conjunto de operações relacionadas)
export const router = t.router;
// Permite criar operações
export const publicProcedure = t.procedure;