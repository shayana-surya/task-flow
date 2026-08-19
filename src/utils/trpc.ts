import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/api/root";

// Cria um cliente React baseado nas rotas que existem no AppRouter
export const trpc = createTRPCReact<AppRouter>();