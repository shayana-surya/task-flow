"use client";

import { Modal } from "./Modal";

// Exibe uma confirmação antes de excluir uma tarefa.

type TaskDeleteModalProps = {
  taskTitle: string;
  onCancelAction: () => void;
  onConfirmAction: () => void;
};

export function TaskDeleteModal({
  taskTitle,
  onCancelAction,
  onConfirmAction,
}: TaskDeleteModalProps) {
  return (
    <Modal title="Excluir tarefa?" onCloseAction={onCancelAction}>
      <p className="text-[#5F6870]">
        Deseja realmente excluir a tarefa &quot;{taskTitle}&quot;?
      </p>
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancelAction}
          className="rounded-lg border border-[#D9D3CC] px-4 py-2 text-[#5F6870] hover:bg-[#F7F5F2]"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirmAction}
          className="rounded-lg bg-[#E88A9B] px-4 py-2 font-semibold text-white hover:bg-[#D9788A]"
        >
          Excluir
        </button>
      </div>
    </Modal>
  );
}
