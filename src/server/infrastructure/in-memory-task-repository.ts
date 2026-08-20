import type {
  CreateTaskData,
  Task,
  TaskRepository,
  UpdateTaskData,
} from "../domain/task";

// A infraestrutura cuida de como os dados são guardados.
// Esta implementação em memória pode ser trocada sem alterar as regras do negócio.
// Os dados são mantidos apenas enquanto a aplicação estiver em execução

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
    // Retornamos cópias para impedir que a tela altere os dados diretamente.
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
    // A cópia mantém o repositório como o único dono dos dados guardados.
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
  // O global evita perder as tarefas a cada recarregamento em desenvolvimento.
  globalRepository[repositoryKey] ?? new InMemoryTaskRepository();

globalRepository[repositoryKey] = taskRepository;
