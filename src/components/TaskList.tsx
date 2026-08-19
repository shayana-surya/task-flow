"use client";

import { trpc } from "@/utils/trpc";
import { TaskItem } from "./TaskItem";

export function TaskList() {
  const { data: tasks, isLoading, error } = trpc.task.list.useQuery();

  if (isLoading) {
    return <p>Carregando tarefas...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500">
        Erro ao carregar tarefas: {error.message}
      </p>
    );
  }

  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500">Nenhuma tarefa cadastrada.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}