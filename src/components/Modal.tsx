"use client";

// Componente reutilizável para exibir conteúdo em uma janela modal.

type ModalProps = {
  title: string;
  onCloseAction: () => void;
  children: React.ReactNode;
};

export function Modal({ title, onCloseAction, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-lg rounded-xl border border-[#D9D3CC] bg-white p-6 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-[#27313A]">{title}</h2>
          <button
            type="button"
            onClick={onCloseAction}
            className="text-2xl leading-none text-gray-500 hover:text-black"
            aria-label="Fechar"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
