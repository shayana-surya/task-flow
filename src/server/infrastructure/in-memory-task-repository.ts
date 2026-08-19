import type {
  CreateTaskData,
  Task,
  TaskRepository,
  UpdateTaskData,
} from "../domain/task";

export class InMemoryTaskRepository implements TaskRepository {
  private readonly tasks: Task[] = [
    {
      id: 1,
      title: "Criar Task Manager",
      description: "Desenvolver um gerenciador de tarefas usando React e TypeScript",
      createdAt: new Date("2026-08-19T12:00:00"),
    },
  ];

  private nextId = 2;

  list() {
    return this.tasks.map((task) => ({ ...task }));
  }

  create(data: CreateTaskData) {
    const task: Task = {
      id: this.nextId++,
      title: data.title,
      description: data.description,
      createdAt: new Date(),
    };

    this.tasks.push(task);
    return { ...task };
  }

  update(data: UpdateTaskData) {
    const task = this.tasks.find((currentTask) => currentTask.id === data.id);

    if (!task) {
      throw new Error("Tarefa não encontrada");
    }

    task.title = data.title;
    task.description = data.description;
    return { ...task };
  }

  delete(id: number) {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      throw new Error("Tarefa não encontrada");
    }

    this.tasks.splice(index, 1);
  }
}

const repositoryKey = Symbol.for("task-flow.in-memory-task-repository");
type RepositoryGlobal = typeof globalThis & {
  [repositoryKey]?: InMemoryTaskRepository;
};

const globalRepository = globalThis as RepositoryGlobal;

export const taskRepository =
  globalRepository[repositoryKey] ?? new InMemoryTaskRepository();

globalRepository[repositoryKey] = taskRepository;
