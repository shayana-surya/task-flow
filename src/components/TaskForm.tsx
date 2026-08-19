"use client";

import { useState } from "react";
import { useCreateTask } from "@/hooks/use-task-mutations";
import { Modal } from "./Modal";
import { useNotification } from "./Notification";

type TaskFormProps = {
  onClose: () => void;
};

export function TaskForm({ onClose }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTask = useCreateTask();
  const { notify } = useNotification();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim()) {
      notify({ type: "warning", message: "Informe um título para a tarefa." });
      return;
    }

    createTask.mutate(
      {
        title: title.trim(),
        description: description.trim() || undefined,
      },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
          onClose();
        },
      }
    );
  }

  return (
    <Modal title="Nova tarefa" onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Título da tarefa"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="border rounded-lg p-3"
          autoFocus
        />

        <textarea
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="border rounded-lg p-3"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="border rounded-lg px-4 py-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={createTask.isPending}
            className="bg-black text-white rounded-lg px-4 py-2 disabled:opacity-50"
          >
            {createTask.isPending ? "Criando..." : "Criar tarefa"}
          </button>
        </div>
      </form>
    </Modal>
  );
}