import { useEffect, useRef, useState } from 'react';
import { BarChart3, BookOpen, ChevronRight, Flame, Home, Library, LogOut, Menu, Search, Settings, Sparkles, Target } from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const secondaryLinks = [
  ['Minhas metas', Target],
  ['Estatísticas', BarChart3],
];

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);
  const firstNavItemRef = useRef(null);
  const menuWasOpen = useRef(false);
  const { showToast } = useToast();
  const location = useLocation();
  const title = location.pathname === '/atividades' ? 'Atividades' : location.pathname === '/recursos' ? 'Recursos' : location.pathname === '/' ? 'Dashboard' : 'Página não encontrada';
  const notify = (message) => showToast(message, 'info');

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (menuOpen) {
      firstNavItemRef.current?.focus();
    } else if (menuWasOpen.current) {
      menuToggleRef.current?.focus();
    }
    menuWasOpen.current = menuOpen;
  }, [menuOpen]);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'mobile-open' : ''}`}>
        <NavLink className="brand" to="/" onClick={closeMenu} aria-label="StudyFlow início"><span className="brand-mark"><Sparkles size={18} /></span><span>study<span>flow</span></span></NavLink>
        <nav className="side-nav" id="primary-navigation" aria-label="Navegação principal">
          <p className="nav-caption">Workspace</p>
          <NavLink ref={firstNavItemRef} end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/" onClick={closeMenu}><Home size={18} />Dashboard</NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/atividades" onClick={closeMenu}><BookOpen size={18} />Atividades<span className="nav-count">6</span></NavLink>
          {secondaryLinks.map(([label, Icon]) => <button className="nav-link" type="button" key={label} onClick={() => notify(`${label} estará disponível em breve.`)}><Icon size={18} />{label}</button>)}
          <p className="nav-caption">Organizar</p>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/recursos" onClick={closeMenu}><Library size={18} />Biblioteca</NavLink>
          <button className="nav-link" type="button" onClick={() => notify('Configurações estarão disponíveis em breve.')}><Settings size={18} />Configurações</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="streak-card"><div className="streak-icon"><Flame size={18} /></div><div><strong>7 dias</strong><span>Sequência atual</span></div></div>
          <div className="profile"><div className="avatar">MC</div><div><strong>Davi</strong><span>Plano estudante</span></div><button aria-label="Sair" onClick={() => notify('A sessão permanece ativa neste protótipo.')}><LogOut size={16} /></button></div>
        </div>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <button ref={menuToggleRef} className="mobile-menu" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}><Menu size={21} /></button>
          <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>{title}</strong></div>
          <div className="top-actions"><button className="search-button" aria-label="Pesquisar" onClick={() => notify('A busca estará disponível em breve.')}><Search size={18} /></button><button className="notification" aria-label="Você tem 2 notificações" onClick={() => notify('Você não tem novas notificações.')}><span /></button><div className="avatar avatar-small">MC</div></div>
        </header>
        <div className="content-wrap"><Outlet /></div>
      </main>
      {menuOpen && <button className="menu-overlay" aria-label="Fechar menu" onClick={closeMenu} />}
    </div>
  );
}
