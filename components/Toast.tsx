"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { Icon, IconName } from "@/components/icons";

type ToastKind = "success" | "error" | "info";
type Toast = { id: number; kind: ToastKind; msg: string };

const ToastCtx = createContext<{ toast: (msg: string, kind?: ToastKind) => void }>({
  toast: () => {},
});

export const useToast = () => useContext(ToastCtx);

const ICONS: Record<ToastKind, IconName> = { success: "check-circle", error: "alert-circle", info: "info" };

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(1);

  const toast = useCallback((msg: string, kind: ToastKind = "success") => {
    const id = idRef.current++;
    setToasts((t) => [...t, { id, kind, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3600);
  }, []);

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div className="toast-wrap" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.kind}`}>
            <span className="toast-icon"><Icon name={ICONS[t.kind]} size={18} /></span>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
