import { trpc } from "@/utils/trpc";
import { useNotification } from "@/components/Notification";

function useTaskUtils() {
  const utils = trpc.useUtils();
  const { notify } = useNotification();

  return { utils, notify };
}

export function useCreateTask() {
  const { utils, notify } = useTaskUtils();
  const createTask = trpc.task.create.useMutation({
    onSuccess: () => {
      utils.task.list.invalidate();
      notify({ type: "success", message: "Tarefa criada com sucesso." });
    },
    onError: (error) => {
      notify({ type: "error", message: `Erro ao criar tarefa: ${error.message}` });
    },
  });

  return createTask;
}

export function useUpdateTask() {
  const { utils, notify } = useTaskUtils();
  const updateTask = trpc.task.update.useMutation({
    onSuccess: () => {
      utils.task.list.invalidate();
      notify({ type: "success", message: "Tarefa atualizada com sucesso." });
    },
    onError: (error) => {
      notify({ type: "error", message: `Erro ao atualizar: ${error.message}` });
    },
  });

  return updateTask;
}

export function useDeleteTask() {
  const { utils, notify } = useTaskUtils();
  const deleteTask = trpc.task.delete.useMutation({
    onSuccess: () => {
      utils.task.list.invalidate();
      notify({ type: "success", message: "Tarefa excluída com sucesso." });
    },
    onError: (error) => {
      notify({ type: "error", message: `Erro ao excluir: ${error.message}` });
    },
  });

  return deleteTask;
}
