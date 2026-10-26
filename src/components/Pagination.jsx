import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return <nav className="pagination" aria-label="Paginação de atividades">
    <button className="icon-button" disabled={currentPage === 1} aria-label="Página anterior" onClick={() => onPageChange(currentPage - 1)}><ChevronLeft size={17} /></button>
    {pages.map((page) => <button key={page} className={`page-button ${currentPage === page ? 'is-current' : ''}`} aria-current={currentPage === page ? 'page' : undefined} onClick={() => onPageChange(page)}>{page}</button>)}
    <button className="icon-button" disabled={currentPage === totalPages} aria-label="Próxima página" onClick={() => onPageChange(currentPage + 1)}><ChevronRight size={17} /></button>
  </nav>;
}
