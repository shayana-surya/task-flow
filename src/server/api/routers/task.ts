import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { taskService } from "../../application/task-service";

export const taskRouter = router({
  list: publicProcedure.query(() => {
    return taskService.list();
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().trim().min(1),
        description: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      return taskService.create(input);
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().trim().min(1),
        description: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      return taskService.update(input);
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(({ input }) => {
      return taskService.delete(input.id);
    }),
});