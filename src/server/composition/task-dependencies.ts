// Este arquivo conecta as peças da aplicação em um só lugar.
// Assim, o serviço depende de um contrato, e não de uma implementação específica.

import { TaskService } from "../application/task-service";
import { taskRepository } from "../infrastructure/in-memory-task-repository";

export const taskService = new TaskService(taskRepository);
