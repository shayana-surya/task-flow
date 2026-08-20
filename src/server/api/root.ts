import { router } from "./trpc";
import { taskRouter } from "./routers/task";

// Router principal que reúne as funcionalidades da API

export const appRouter = router({
  task: taskRouter,
});

export type AppRouter = typeof appRouter;