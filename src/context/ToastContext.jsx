import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const dismissToast = useCallback(() => setToast(null), []);
  const showToast = useCallback((message, type = 'info') => {
    setToast({ id: Date.now(), message, type });
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(dismissToast, 4200);
    return () => window.clearTimeout(timer);
  }, [toast, dismissToast]);

  const value = useMemo(() => ({ toast, showToast, dismissToast }), [toast, showToast, dismissToast]);
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
}
