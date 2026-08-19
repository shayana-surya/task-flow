"use client";

import type { AppRouter } from "@/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";
import { useEffect, useState } from "react";
import {
  useDeleteTask,
  useUpdateTask,
} from "@/hooks/use-task-mutations";
import { useNotification } from "./Notification";
import { Modal } from "./Modal";
import { TaskDeleteModal } from "./TaskDeleteModal";

type RouterOutput = inferRouterOutputs<AppRouter>;
type Task = RouterOutput["task"]["list"][number];

type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const { notify } = useNotification();

  useEffect(() => {
    if (!isEditing) {
      setTitle(task.title);
      setDescription(task.description ?? "");
    }
  }, [isEditing, task.title, task.description]);

  function handleUpdate(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim()) {
      notify({ type: "warning", message: "Informe um título para a tarefa." });
      return;
    }

    updateTask.mutate(
      {
        id: task.id,
        title: title.trim(),
        description: description.trim() || undefined,
      },
      {
        onSuccess: () => setIsEditing(false),
      }
    );
  }

  function handleConfirmDelete() {
    setIsDeleteOpen(false);
    deleteTask.mutate({ id: task.id });
  }

  return (
    <>
      <article className="rounded-xl border border-[#D9D3CC] bg-white p-4 shadow-sm">
        <h3 className="text-lg font-semibold">{task.title}</h3>

        {task.description && (
          <p className="mt-2 text-gray-600">{task.description}</p>
        )}

        <p className="mt-2 text-sm text-gray-400">
          Criada em: {new Date(task.createdAt).toLocaleDateString("pt-BR")}
        </p>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-lg border border-[#7198B5] px-3 py-1 text-[#587B96] hover:bg-[#F7F5F2]"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => setIsDeleteOpen(true)}
            disabled={deleteTask.isPending}
            className="rounded-lg border border-[#E88A9B] px-3 py-1 text-[#C96B7D] hover:bg-[#FFF1F3] disabled:opacity-50"
          >
            {deleteTask.isPending ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </article>

      {isEditing && (
        <Modal title="Editar tarefa" onCloseAction={() => setIsEditing(false)}>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="rounded-lg border p-3"
              autoFocus
            />
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="rounded-lg border p-3"
              placeholder="Descrição (opcional)"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-lg border px-4 py-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={updateTask.isPending}
                className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
              >
                {updateTask.isPending ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {isDeleteOpen && (
        <TaskDeleteModal
          taskTitle={task.title}
          onCancelAction={() => setIsDeleteOpen(false)}
          onConfirmAction={handleConfirmDelete}
        />
      )}
    </>
  );
}
