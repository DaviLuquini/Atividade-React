# StudyFlow — Design da Aplicação

## Objetivo

Criar uma aplicação React responsiva para demonstrar seis componentes visuais
interativos exigidos pela atividade: acordeão, paginação, barra de progresso,
abas, menu suspenso e notificação toast.

## Direção visual

O produto será um dashboard acadêmico chamado **StudyFlow**. A interface usará
azul/índigo como cor principal, superfícies claras, cards com hierarquia visual
e uma navegação lateral que se reorganiza em telas menores.

## Arquitetura

- `App.js` será o componente principal e orquestrará o layout e os dados.
- Componentes funcionais serão separados por responsabilidade.
- O Context API compartilhará o estado global de feedback/toast entre áreas
  não diretamente relacionadas, atendendo ao desafio extra.
- Props serão usadas para dados, estados controlados e callbacks.
- Hooks locais controlarão seleção de abas, item aberto do acordeão, dropdown e
  página atual.

## Componentes e comportamento

- **ProgressBar**: recebe valor de 0 a 100, expõe `role="progressbar"` e
  atualiza preenchimento e texto percentual.
- **Tabs**: recebe painéis, mantém uma aba ativa e expõe relações ARIA entre
  tabs e tabpanels.
- **Dropdown**: abre com botão, fecha ao selecionar, clicar fora ou pressionar
  Escape e permite selecionar um filtro de disciplina.
- **Pagination**: recebe total de páginas e página atual, renderiza páginas
  específicas e anterior/próxima com estados desabilitados.
- **Accordion**: recebe perguntas e respostas, mantém apenas um item aberto,
  com transição visual e atributos `aria-expanded`/`aria-controls`.
- **Toast**: mostra mensagens de sucesso, informação ou erro por tempo
  limitado, com fechamento manual e `aria-live`.

O dashboard usará as abas “Visão geral”, “Atividades” e “Recursos”; a lista de
atividades será paginada; e uma seção de FAQ demonstrará o acordeão.

## Responsividade e acessibilidade

O HTML usará `header`, `nav`, `main`, `section` e `footer` semânticos. Todos
os controles serão elementos nativos de botão ou seleção, com foco visível,
rótulos, estados ARIA e navegação por teclado. No mobile, a navegação lateral
virará uma barra horizontal/compacta e os cards passarão para uma coluna. Em
tablet e desktop, o layout usará grid com duas colunas e espaçamento fluido.

## Validação

Será executado o build da aplicação e serão verificados manualmente os fluxos
de abrir/fechar o acordeão, alternar abas, selecionar o dropdown, paginar,
atualizar progresso e exibir/fechar o toast em larguras mobile, tablet e
desktop.
