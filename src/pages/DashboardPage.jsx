import { useMemo, useState } from 'react';
import { Check, ChevronRight, Clock3, Flame, Plus, PlayCircle, Target } from 'lucide-react';
import Accordion from '../components/Accordion';
import Dropdown from '../components/Dropdown';
import Pagination from '../components/Pagination';
import ProgressBar from '../components/ProgressBar';
import Tabs from '../components/Tabs';
import { useToast } from '../context/ToastContext';
import { ActivityList, activities } from './ActivitiesPage';

const faq = [
  { question: 'Como funciona o acompanhamento de progresso?', answer: 'O StudyFlow reúne suas atividades concluídas, horas de estudo e metas em um só lugar. Cada atividade concluída atualiza automaticamente seus indicadores.' },
  { question: 'Posso organizar estudos por disciplina?', answer: 'Sim. Use o filtro de disciplina na área de atividades para encontrar rapidamente o que deseja estudar.' },
  { question: 'Como crio uma nova meta de estudo?', answer: 'Clique em “Nova meta” no resumo do dashboard e defina o objetivo, a frequência e o prazo que deseja acompanhar.' },
];

export default function DashboardPage() {
  const { showToast } = useToast();
  const [discipline, setDiscipline] = useState('Todas as disciplinas');
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => discipline === 'Todas as disciplinas' ? activities : activities.filter((item) => item.subject === discipline), [discipline]);
  const pages = Math.max(1, Math.ceil(filtered.length / 4));
  const visible = filtered.slice((page - 1) * 4, page * 4);
  const selectDiscipline = (value) => { setDiscipline(value); setPage(1); showToast(`Filtro aplicado: ${value}`, 'info'); };
  const tabs = [
    { label: 'Visão geral', icon: <Target size={16} />, content: <div className="overview-copy"><p>Você concluiu <strong>3 sessões</strong> hoje. Que tal reservar mais 25 minutos para sua próxima atividade?</p><button className="secondary-button" onClick={() => showToast('Sessão de foco iniciada!', 'success')}><PlayCircle size={17} />Iniciar sessão</button></div> },
    { label: 'Atividades', icon: <Check size={16} />, content: <ActivityList activities={visible} /> },
    { label: 'Recursos', icon: <Target size={16} />, content: <div className="resource-grid"><Resource title="Biblioteca de resumos" detail="32 materiais salvos" /><Resource title="Grupos de estudo" detail="3 grupos ativos" /></div> },
  ];
  return <>
    <section className="welcome-row"><div><p className="eyebrow">SEGUNDA-FEIRA, 26 DE OUTUBRO</p><h1>Bom dia, Davi <span>✦</span></h1><p className="subtitle">Continue no seu ritmo. Você está construindo algo incrível.</p></div><button className="primary-button" onClick={() => showToast('Nova meta criada com sucesso!', 'success')}><Plus size={18} />Nova meta</button></section>
    <section className="metric-grid" aria-label="Resumo do seu progresso"><Metric icon={<Target />} label="Progresso semanal" value="68%" detail="+12% vs. semana passada" color="purple" /><Metric icon={<Clock3 />} label="Tempo estudado" value="12h 45m" detail="+2h 20m esta semana" color="blue" /><Metric icon={<Check />} label="Tarefas concluídas" value="24" detail="de 32 tarefas" color="green" /><Metric icon={<Flame />} label="Sequência atual" value="7 dias" detail="Seu melhor: 14 dias" color="orange" /></section>
    <section className="dashboard-panel"><div className="panel-heading"><div><p className="eyebrow">ACOMPANHAMENTO</p><h2>Seu progresso</h2></div><button className="text-button" onClick={() => showToast('Relatório completo em breve.', 'info')}>Ver relatório <ChevronRight size={16} /></button></div><div className="progress-overview"><div className="big-progress"><div className="progress-ring"><span>68<small>%</small></span></div><div><strong>Você está indo muito bem!</strong><p>Faltam 3h 15m para atingir sua meta semanal.</p></div></div><div className="goal-progress"><ProgressBar label="Meta semanal" value={68} /><ProgressBar label="Meta mensal" value={82} color="green" /></div></div></section>
    <section className="dashboard-panel activity-panel"><div className="panel-heading"><div><p className="eyebrow">ROTINA DE ESTUDOS</p><h2>Atividades recentes</h2></div><Dropdown label="Filtrar por" options={['Todas as disciplinas', 'Matemática', 'História', 'Biologia', 'Português', 'Inglês']} value={discipline} onChange={selectDiscipline} /></div><Tabs tabs={tabs} /><Pagination currentPage={page} totalPages={pages} onPageChange={setPage} /></section>
    <section className="dashboard-panel faq-panel"><div className="panel-heading"><div><p className="eyebrow">PRECISA DE AJUDA?</p><h2>Perguntas frequentes</h2></div><button className="text-button" onClick={() => showToast('A Central de ajuda estará disponível em breve.', 'info')}>Central de ajuda <ChevronRight size={16} /></button></div><Accordion items={faq} /></section>
  </>;
}

function Metric({ icon, label, value, detail, color }) { return <article className="metric-card"><div className={`metric-icon ${color}`}>{icon}</div><div className="metric-copy"><span>{label}</span><strong>{value}</strong><small className={color === 'orange' ? 'muted' : 'positive'}>{detail}</small></div></article>; }
function Resource({ title, detail }) { return <div className="resource-card"><div className="resource-icon"><Target /></div><strong>{title}</strong><span>{detail}</span></div>; }
