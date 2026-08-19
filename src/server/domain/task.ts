export type Task = {
  id: number;
  title: string;
  description?: string;
  createdAt: Date;
};

export type CreateTaskData = {
  title: string;
  description?: string;
};

export type UpdateTaskData = {
  id: number;
  title: string;
  description?: string;
};

export interface TaskRepository {
  list(): Task[];
  create(data: CreateTaskData): Task;
  update(data: UpdateTaskData): Task;
  delete(id: number): void;
}
