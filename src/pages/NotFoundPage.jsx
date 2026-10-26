import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return <section className="dashboard-panel"><p className="eyebrow">ERRO 404</p><h1>Página não encontrada</h1><p className="subtitle">O caminho que você tentou acessar não existe.</p><Link className="primary-button" to="/">Voltar ao dashboard</Link></section>;
}
