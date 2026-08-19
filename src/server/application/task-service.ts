import type {
  CreateTaskData,
  Task,
  TaskRepository,
  UpdateTaskData,
} from "../domain/task";
import { taskRepository } from "../infrastructure/in-memory-task-repository";

export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  list(): Task[] {
    return this.repository.list();
  }

  create(data: CreateTaskData): Task {
    return this.repository.create({
      title: data.title.trim(),
      description: data.description?.trim() || undefined,
    });
  }

  update(data: UpdateTaskData): Task {
    return this.repository.update({
      id: data.id,
      title: data.title.trim(),
      description: data.description?.trim() || undefined,
    });
  }

  delete(id: number): { success: true } {
    this.repository.delete(id);
    return { success: true };
  }
}

export const taskService = new TaskService(taskRepository);
