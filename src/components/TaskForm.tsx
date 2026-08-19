"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";

export function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const utils = trpc.useUtils();

  const createTask = trpc.task.create.useMutation({
    onSuccess: () => {
      setTitle("");
      setDescription("");

      utils.task.list.invalidate();
    },
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    createTask.mutate({
      title: title.trim(),
      description: description.trim() || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Título da tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="border rounded-lg p-3"
      />

      <textarea
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className="border rounded-lg p-3"
      />

      <button
        type="submit"
        disabled={createTask.isPending}
        className="bg-black text-white rounded-lg p-3 disabled:opacity-50"
      >
        {createTask.isPending ? "Criando..." : "Criar tarefa"}
      </button>

      {createTask.error && (
        <p className="text-red-500">
          Erro ao criar tarefa: {createTask.error.message}
        </p>
      )}
    </form>
  );
}