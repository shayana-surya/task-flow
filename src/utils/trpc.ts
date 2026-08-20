import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/api/root";

// Cria o cliente tRPC usado pelos componentes React.
export const trpc = createTRPCReact<AppRouter>();