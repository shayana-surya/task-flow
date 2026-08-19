"use client";

import type { AppRouter } from "@/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

type RouterOutput = inferRouterOutputs<AppRouter>;
type Task = RouterOutput["task"]["list"][number];

type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(
    task.description ?? ""
  );

  const utils = trpc.useUtils();

  const deleteTask = trpc.task.delete.useMutation({
    onSuccess: () => {
      utils.task.list.invalidate();
    },
  });

  const updateTask = trpc.task.update.useMutation({
    onSuccess: () => {
      setIsEditing(false);
      utils.task.list.invalidate();
    },
  });

  function handleDelete() {
    const confirmed = window.confirm(
      `Deseja excluir a tarefa "${task.title}"?`
    );

    if (!confirmed) {
      return;
    }

    deleteTask.mutate({
      id: task.id,
    });
  }

  function handleUpdate(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    updateTask.mutate({
      id: task.id,
      title: title.trim(),
      description: description.trim() || undefined,
    });
  }

  if (isEditing) {
    return (
      <form
        onSubmit={handleUpdate}
        className="border rounded-lg p-4 flex flex-col gap-4"
      >
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="border rounded-lg p-3"
        />

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="border rounded-lg p-3"
          placeholder="Descrição (opcional)"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={updateTask.isPending}
            className="border rounded px-3 py-1 disabled:opacity-50"
          >
            {updateTask.isPending ? "Salvando..." : "Salvar"}
          </button>

          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="border rounded px-3 py-1"
          >
            Cancelar
          </button>
        </div>

        {updateTask.error && (
            <p className="text-red-500">
                Erro ao atualizar: {updateTask.error.message}
            </p>
        )}

      </form>
    );
  }

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold">
        {task.title}
      </h3>

      {task.description && (
        <p className="text-gray-600 mt-2">
          {task.description}
        </p>
      )}

      <p className="text-sm text-gray-400 mt-2">
        Criada em:{" "}
        {new Date(task.createdAt).toLocaleDateString("pt-BR")}
      </p>

      {deleteTask.error && (
        <p className="text-red-500 mt-2">
            Erro ao excluir: {deleteTask.error.message}
        </p>
      )}

      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="border rounded px-3 py-1"
        >
          Editar
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleteTask.isPending}
          className="border rounded px-3 py-1 disabled:opacity-50"
        >
          {deleteTask.isPending ? "Excluindo..." : "Excluir"}
        </button>
      </div>
    </div>
  );
}