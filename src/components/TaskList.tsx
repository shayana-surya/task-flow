"use client";

import { useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { TaskItem } from "@/components/TaskItem";
import { useNotification } from "./Notification";

// Busca as tarefas e controla os estados de carregamento, erro e lista vazia.
export function TaskList() {
  const { notify } = useNotification();
  const { data: tasks, isLoading, error } = trpc.task.list.useQuery();

  useEffect(() => {
    if (error) {
      notify({
        type: "error",
        message: `Erro ao carregar tarefas: ${error.message}`,
      });
    }
  }, [error, notify]);

  if (isLoading) {
    return <p>Carregando tarefas...</p>;
  }

  if (error) {
    return (
      <p>Não foi possível carregar as tarefas.</p>
    );
  }

  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500">Nenhuma tarefa cadastrada.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}