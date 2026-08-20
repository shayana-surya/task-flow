import type {
  CreateTaskData,
  Task,
  TaskRepository,
  UpdateTaskData,
} from "../domain/task";

// No DDD, esta camada concentra os casos de uso do negócio.
// Ela não sabe como os dados são guardados; apenas usa o contrato do repositório.

export class TaskService {
  // Receber uma abstração deixa o serviço fácil de testar e segue a inversão de dependência do SOLID.
  constructor(private readonly repository: TaskRepository) {}

  list(): Task[] {
    return this.repository.list();
  }

  create(data: CreateTaskData): Task {
    // Limpamos os textos aqui para manter os dados consistentes, mesmo que outro cliente use a API.
    return this.repository.create({
      title: data.title.trim(),
      description: data.description?.trim() || undefined,
    });
  }

  update(data: UpdateTaskData): Task {
    // Repetimos a limpeza na edição para manter o mesmo padrão da criação.
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
