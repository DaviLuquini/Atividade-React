import { FileText, Users } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ResourcesPage() {
  const { showToast } = useToast();
  return <section className="dashboard-panel"><div className="panel-heading"><div><p className="eyebrow">ORGANIZAR</p><h1>Recursos</h1><p className="subtitle">Materiais para apoiar sua rotina de estudos.</p></div></div><div className="resource-grid"><button className="resource-card" onClick={() => showToast('A biblioteca de resumos estará disponível em breve.', 'info')}><div className="resource-icon"><FileText /></div><strong>Biblioteca de resumos</strong><span>32 materiais salvos</span></button><button className="resource-card" onClick={() => showToast('Os grupos de estudo estarão disponíveis em breve.', 'info')}><div className="resource-icon"><Users /></div><strong>Grupos de estudo</strong><span>3 grupos ativos</span></button></div></section>;
}
