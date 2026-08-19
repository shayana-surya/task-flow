import { TaskService } from "../application/task-service";
import { taskRepository } from "../infrastructure/in-memory-task-repository";

export const taskService = new TaskService(taskRepository);
