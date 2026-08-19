import { trpc } from "@/utils/trpc";
import { useNotification } from "@/components/Notification";

function useTaskUtils() {
  const utils = trpc.useUtils();
  const { notify } = useNotification();

  return { utils, notify };
}

function useTaskMutationFeedback(
  successMessage: string,
  errorPrefix: string
) {
  const { utils, notify } = useTaskUtils();

  return {
    onSuccess: () => {
      utils.task.list.invalidate();
      notify({ type: "success", message: successMessage });
    },
    onError: (error: { message: string }) => {
      notify({ type: "error", message: `${errorPrefix}: ${error.message}` });
    },
  };
}

export function useCreateTask() {
  return trpc.task.create.useMutation(
    useTaskMutationFeedback("Tarefa criada com sucesso.", "Erro ao criar tarefa")
  );
}

export function useUpdateTask() {
  return trpc.task.update.useMutation(
    useTaskMutationFeedback("Tarefa atualizada com sucesso.", "Erro ao atualizar")
  );
}

export function useDeleteTask() {
  return trpc.task.delete.useMutation(
    useTaskMutationFeedback("Tarefa excluída com sucesso.", "Erro ao excluir")
  );
}
