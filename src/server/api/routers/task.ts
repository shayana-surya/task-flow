import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { taskService } from "../../composition/task-dependencies";

// A rota adapta as entradas da API para os casos de uso do domínio.
// Ela não guarda regras de negócio, seguindo a responsabilidade única do SOLID.

export const taskRouter = router({
  // Consulta as tarefas disponíveis
  list: publicProcedure.query(() => {
    return taskService.list();
  }),

  // Valida os dados recebidos e solicita a criação da tarefa
  create: publicProcedure
    .input(
      z.object({
        // O título precisa ter algum texto depois de remover os espaços.
        title: z.string().trim().min(1),
        description: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      return taskService.create(input);
    }),

  // Valida os dados recebidos e atualiza uma tarefa existente
  update: publicProcedure
    .input(
      z.object({
        // O id informa exatamente qual tarefa deve ser alterada.
        id: z.number(),
        // A mesma regra vale ao criar e editar uma tarefa.
        title: z.string().trim().min(1),
        description: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      return taskService.update(input);
    }),

  // Remove uma tarefa existente
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