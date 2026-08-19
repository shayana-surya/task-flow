"use client";

import { trpc } from "@/utils/trpc";

export default function Home() {
  const { data: tasks, isLoading, error } = trpc.task.list.useQuery();

  if (isLoading) {
    return <div>Carregando tarefas...</div>;
  }

  if (error) {
    return <div>Erro ao carregar tarefas: {error.message}</div>;
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">
        Task Flow
      </h1>

      <div className="flex flex-col gap-4">
        {tasks?.map((task) => (
          <div
            key={task.id}
            className="border rounded-lg p-4"
          >
            <h2 className="text-xl font-semibold">
              {task.title}
            </h2>

            {task.description && (
              <p className="text-gray-600 mt-2">
                {task.description}
              </p>
            )}

            <p className="text-sm text-gray-400 mt-2">
              Criada em:{" "}
              {new Date(task.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}