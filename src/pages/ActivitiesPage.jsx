import { useMemo, useState } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import Dropdown from '../components/Dropdown';
import Pagination from '../components/Pagination';
import { useToast } from '../context/ToastContext';

export const activities = [
  { title: 'Revisão — Funções quadráticas', subject: 'Matemática', type: 'Lista de exercícios', time: 'Hoje, 09:40', done: true, color: 'purple' },
  { title: 'Aula — Revolução Industrial', subject: 'História', type: 'Vídeo • 24 min', time: 'Ontem, 16:20', done: true, color: 'orange' },
  { title: 'Leitura — Ecossistemas', subject: 'Biologia', type: 'Capítulo 4', time: 'Ontem, 11:15', done: false, color: 'green' },
  { title: 'Quiz — Interpretação de texto', subject: 'Português', type: '12 questões', time: '12 out, 14:50', done: false, color: 'blue' },
  { title: 'Prática — Conversação básica', subject: 'Inglês', type: 'Exercício guiado', time: '11 out, 10:25', done: false, color: 'pink' },
  { title: 'Resumo — Geometria espacial', subject: 'Matemática', type: 'Anotações', time: '10 out, 18:05', done: true, color: 'purple' },
];

export default function ActivitiesPage() {
  const { showToast } = useToast();
  const [discipline, setDiscipline] = useState('Todas as disciplinas');
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => discipline === 'Todas as disciplinas' ? activities : activities.filter((item) => item.subject === discipline), [discipline]);
  const pages = Math.max(1, Math.ceil(filtered.length / 4));
  const select = (value) => { setDiscipline(value); setPage(1); showToast(`Filtro aplicado: ${value}`, 'info'); };
  return <section className="dashboard-panel activity-panel"><div className="panel-heading"><div><p className="eyebrow">ROTINA DE ESTUDOS</p><h1>Atividades</h1><p className="subtitle">Acompanhe tudo o que você estudou.</p></div><Dropdown label="Filtrar por" options={['Todas as disciplinas', 'Matemática', 'História', 'Biologia', 'Português', 'Inglês']} value={discipline} onChange={select} /></div><ActivityList activities={filtered.slice((page - 1) * 4, page * 4)} /><Pagination currentPage={page} totalPages={pages} onPageChange={setPage} /></section>;
}

export function ActivityList({ activities: list }) {
  const { showToast } = useToast();
  return <div className="activity-list">{list.length ? list.map((activity) => <div className="activity-row" key={activity.title}><div className={`activity-icon ${activity.color}`}><BookOpen size={18} /></div><div className="activity-info"><strong>{activity.title}</strong><span>{activity.subject} <i /> {activity.type}</span></div><time>{activity.time}</time><span className={`status ${activity.done ? 'completed' : 'pending'}`}>{activity.done ? 'Concluída' : 'Em andamento'}</span><button className="row-arrow" aria-label={`Abrir ${activity.title}`} onClick={() => showToast(`${activity.title}: detalhes em breve.`, 'info')}><ChevronRight size={17} /></button></div>) : <p className="empty-state">Nenhuma atividade encontrada.</p>}</div>;
}
