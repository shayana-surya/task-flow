"use client";

import { useState } from "react";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { NotificationProvider } from "./Notification";

export function TaskBoard() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <NotificationProvider>
      <header className="-mx-8 -mt-8 mb-10 flex items-center justify-between gap-4 bg-[#7198B5] px-8 py-5">
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="rounded-lg bg-white px-4 py-2 font-medium text-[#7198B5] hover:bg-[#F7F5F2]"
        >
          + Nova tarefa
        </button>

        <h1 className="text-3xl font-bold text-white">Gerenciador de Tarefas</h1>
      </header>

      {isCreateOpen && (
        <TaskForm
          onCloseAction={() => setIsCreateOpen(false)}
        />
      )}

      <section>
        <h2 className="text-xl font-semibold mb-4">Minhas tarefas</h2>
        <TaskList />
      </section>
    </NotificationProvider>
  );
}