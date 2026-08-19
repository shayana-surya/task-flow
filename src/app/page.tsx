import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Task Flow
      </h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Nova tarefa
        </h2>

        <TaskForm />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          Minhas tarefas
        </h2>

        <TaskList />
      </section>
    </main>
  );
}