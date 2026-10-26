import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Toast() {
  const { toast, dismissToast } = useToast();
  if (!toast) return null;
  const Icon = toast.type === 'success' ? CheckCircle2 : toast.type === 'error' ? XCircle : Info;
  return <div className={`toast toast-${toast.type}`} role="status" aria-live="polite"><Icon size={19} aria-hidden="true" /><span>{toast.message}</span><button aria-label="Fechar notificação" onClick={dismissToast}><X size={17} /></button></div>;
}
