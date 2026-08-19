import { z } from "zod";
import { router, publicProcedure } from "../trpc";

type Task = {
  id: number;
  title: string;
  description?: string;
  createdAt: Date;
};

let tasks: Task[] = [
  {
    id: 1,
    title: "Criar Task Manager",
    description: "Desenvolver um gerenciador de tarefas usando React e TypeScript",
    createdAt: new Date("2026-08-19"),
  },
];
let nextId = 2;

export const taskRouter = router({
  list: publicProcedure.query(() => {
    return tasks;
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      const task: Task = {
        id: nextId++,
        title: input.title,
        description: input.description ?? "",
        createdAt: new Date(),
      };

      tasks.push(task);
      return task;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1),
        description: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      const task = tasks.find((task) => task.id === input.id);

      if (!task) {
        throw new Error("Tarefa não encontrada");
      }

      task.title = input.title;
      task.description = input.description ?? "";

      return task;
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(({ input }) => {
      const index = tasks.findIndex((task) => task.id === input.id);

      if (index === -1) {
        throw new Error("Tarefa não encontrada");
      }

      tasks.splice(index, 1);

      return {
        success: true,
      };
    }),
});