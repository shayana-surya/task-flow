"use client";

import { Modal } from "./Modal";

type TaskDeleteModalProps = {
  taskTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function TaskDeleteModal({
  taskTitle,
  onCancel,
  onConfirm,
}: TaskDeleteModalProps) {
  return (
    <Modal title="Excluir tarefa?" onClose={onCancel}>
      <p className="text-[#5F6870]">
        Deseja realmente excluir a tarefa &quot;{taskTitle}&quot;?
      </p>
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-[#D9D3CC] px-4 py-2 text-[#5F6870] hover:bg-[#F7F5F2]"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-lg bg-[#E88A9B] px-4 py-2 font-semibold text-white hover:bg-[#D9788A]"
        >
          Excluir
        </button>
      </div>
    </Modal>
  );
}
