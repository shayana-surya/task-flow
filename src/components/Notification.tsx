"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type NotificationType = "error" | "warning" | "success";

type Notification = {
  type: NotificationType;
  message: string;
};

type NotificationContextValue = {
  notify: (notification: Notification) => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(null);

const notificationColors: Record<NotificationType, string> = {
  error: "#E88A9B",
  warning: "#D9B650",
  success: "#78A889",
};

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notification, setNotification] = useState<Notification | null>(null);

  const notify = useCallback((nextNotification: Notification) => {
    setNotification(nextNotification);

    window.setTimeout(() => {
      setNotification((current) =>
        current === nextNotification ? null : current
      );
    }, 4000);
  }, []);

  const contextValue = useMemo(() => ({ notify }), [notify]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {notification && (
        <div className="fixed bottom-6 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
          <div
            role="alert"
            className="flex items-center justify-between gap-4 rounded-xl px-5 py-4 text-white shadow-lg"
            style={{ backgroundColor: notificationColors[notification.type] }}
          >
            <span>{notification.message}</span>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="text-xl leading-none text-white/80 hover:text-white"
              aria-label="Fechar mensagem"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification deve ser usado dentro de NotificationProvider");
  }

  return context;
}