# React Router no StudyFlow — Design

## Objetivo

Adicionar navegação real ao StudyFlow para demonstrar React Router de forma
didática, sem remover os seis componentes interativos já existentes nem o
Toast Context global.

## Arquitetura escolhida

Usar `BrowserRouter`, `Routes`, `Route`, `NavLink` e `Outlet` do
`react-router-dom`. O `ToastProvider` permanecerá acima do roteador, permitindo
feedback global em qualquer página.

Rotas:

- `/`: dashboard atual;
- `/atividades`: lista completa de atividades com filtro e paginação;
- `/recursos`: biblioteca de resumos, grupos de estudo e FAQ;
- `*`: página 404 com retorno ao dashboard.

O layout compartilhado conterá sidebar, header, menu mobile e `<Outlet />`.
`NavLink` substituirá links hash e indicará a rota ativa sem recarregar a
página. As páginas reutilizarão os componentes existentes por props.

## Fluxo e acessibilidade

O usuário navega pelo menu lateral ou pelos links internos. Rotas desconhecidas
não produzirão tela vazia: serão tratadas pela página 404. Os links continuarão
usando elementos nativos, com estado ativo visível, `aria-current` fornecido
por `NavLink`, landmarks semânticos e foco preservado pelo navegador.

## Dependências e validação

Adicionar apenas `react-router-dom`. Validar com `npm install`, `npm run build`
e navegação manual entre `/`, `/atividades`, `/recursos` e uma URL inexistente,
incluindo o menu mobile e os toasts.
