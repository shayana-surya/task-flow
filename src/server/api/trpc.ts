import { initTRPC } from "@trpc/server";
import superjson from "superjson";

// Configuração do mecanismo tRPC

// Configura o tRPC usando o contexto criado para cada requisição.
const t = initTRPC.create({ transformer: superjson });

// Ferramentas usadas pelos routers para organizar e expor as operações da API
export const router = t.router;

export const publicProcedure = t.procedure;