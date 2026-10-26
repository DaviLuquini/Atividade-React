# StudyFlow Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a responsive React academic dashboard that demonstrates the six required interactive components and a Context API bonus.

**Architecture:** Use a small Vite React app with `App.jsx` as the composition root, a `components/` directory for focused functional components, and `context/ToastContext.jsx` for global feedback state. Keep styling in one responsive `src/styles.css` file to make layout behavior easy to inspect and explain.

**Tech Stack:** React, Vite, JavaScript/JSX, Context API, CSS, npm.

---

### Task 1: Scaffold the React application

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/styles.css`

**Step 1: Write the failing smoke test**

Use the project build as the initial executable check; the empty directory must not yet have a build script.

**Step 2: Run it to verify it fails**

Run: `npm run build`
Expected: FAIL because the npm project has not been scaffolded.

**Step 3: Write the minimal implementation**

Create a Vite React entry point, render `<App />` from `main.jsx`, and add a temporary semantic dashboard shell in `App.jsx`. Add npm scripts for `dev`, `build`, and `preview`.

**Step 4: Run the build to verify it passes**

Run: `npm run build`
Expected: PASS and a generated `dist/` directory.

**Step 5: Commit**

Run: `git add package.json index.html src && git commit -m "chore: scaffold StudyFlow React app"`

### Task 2: Add the global toast context

**Files:**
- Create: `src/context/ToastContext.jsx`
- Modify: `src/main.jsx`

**Step 1: Write the failing test**

Define the expected contract: `ToastProvider` exposes `showToast(message, type)` and `useToast` throws a clear error when used outside the provider.

**Step 2: Run the project check**

Run: `npm run build`
Expected: PASS before the context implementation, establishing the baseline.

**Step 3: Write minimal implementation**

Implement context state with one active toast, an automatic timeout, manual dismissal, and explicit error handling for an invalid provider boundary. Wrap `<App />` with `ToastProvider`.

**Step 4: Run the build**

Run: `npm run build`
Expected: PASS with no JSX or type errors.

**Step 5: Commit**

Run: `git add src/context src/main.jsx && git commit -m "feat: add global toast context"`

### Task 3: Implement ProgressBar, Tabs, Dropdown, and Pagination

**Files:**
- Create: `src/components/ProgressBar.jsx`
- Create: `src/components/Tabs.jsx`
- Create: `src/components/Dropdown.jsx`
- Create: `src/components/Pagination.jsx`

**Step 1: Write the failing test**

Record the required interactions to validate in the browser: progress clamps to 0–100; tabs expose one selected panel; dropdown opens and closes on selection/outside/Escape; pagination disables previous/next at the boundaries.

**Step 2: Run the build baseline**

Run: `npm run build`
Expected: PASS before the new components are wired.

**Step 3: Implement the components**

Use functional components and props. Add `role="progressbar"` with `aria-valuenow`, tablist/tab/tab roles with `aria-selected`, a real button for the dropdown trigger and document-level outside/Escape handling, and page buttons with `aria-current="page"` and disabled boundary controls.

**Step 4: Run the build**

Run: `npm run build`
Expected: PASS.

**Step 5: Commit**

Run: `git add src/components && git commit -m "feat: add dashboard navigation components"`

### Task 4: Implement Accordion and Toast presentation

**Files:**
- Create: `src/components/Accordion.jsx`
- Create: `src/components/Toast.jsx`

**Step 1: Write the failing test**

Define the expected interaction: only one FAQ item can be open at a time; opening an item updates `aria-expanded` and the panel visibility; toast content and type are announced and can be dismissed.

**Step 2: Implement the components**

Use a single `openIndex` state in `Accordion`, stable generated IDs, and CSS classes for the transition. Make `Toast` consume the context state, use `role="status"`/`aria-live`, and provide a close button.

**Step 3: Run the build**

Run: `npm run build`
Expected: PASS.

**Step 4: Commit**

Run: `git add src/components && git commit -m "feat: add FAQ accordion and toast"`

### Task 5: Compose the StudyFlow dashboard

**Files:**
- Modify: `src/App.jsx`

**Step 1: Define the data**

Add arrays for navigation items, tabs, activities, FAQ entries, and discipline options. Keep display data separate from component logic so props are visible and easy to explain.

**Step 2: Wire state and callbacks**

Track selected discipline, current page, and selected tab in `App`. Use the toast context after filter changes and activity actions. Derive the filtered activity list and current page without mutating source arrays.

**Step 3: Compose the layout**

Add semantic header, sidebar navigation, summary cards, progress section, tabs, paginated activity list, FAQ section, and `Toast`. Ensure all six required components are rendered in the main user flow.

**Step 4: Run the build**

Run: `npm run build`
Expected: PASS.

**Step 5: Commit**

Run: `git add src/App.jsx && git commit -m "feat: compose StudyFlow dashboard"`

### Task 6: Add responsive styling and visual states

**Files:**
- Modify: `src/styles.css`

**Step 1: Add base styles**

Define CSS variables, typography, cards, buttons, focus rings, badges, progress fill, tabs, dropdown, accordion states, toast variants, and pagination.

**Step 2: Add responsive breakpoints**

Use a mobile-first layout. At tablet width, move to a two-column content grid; at desktop width, show the sidebar and two-column dashboard. At mobile width, stack cards and make navigation horizontally scrollable without clipping controls.

**Step 3: Add transitions**

Animate accordion panel height/opacity through a class-based max-height transition and use short hover/focus transitions elsewhere. Respect `prefers-reduced-motion`.

**Step 4: Run the build**

Run: `npm run build`
Expected: PASS.

**Step 5: Commit**

Run: `git add src/styles.css && git commit -m "style: make StudyFlow responsive"`

### Task 7: Validate required interactions and delivery

**Files:**
- Verify: `src/App.jsx`
- Verify: `src/components/*.jsx`
- Verify: `src/context/ToastContext.jsx`

**Step 1: Run the production build**

Run: `npm run build`
Expected: PASS with no warnings that indicate broken imports or invalid syntax.

**Step 2: Run the development server**

Run: `npm run dev -- --host 0.0.0.0`
Expected: Vite reports a reachable local URL.

**Step 3: Manually validate desktop, tablet, and mobile**

Check tab switching, dropdown selection/outside/Escape dismissal, page boundary disabling, accordion single-open behavior, progress display, toast timeout/manual close, visible focus, and no horizontal overflow at approximately 375px, 768px, and 1440px widths.

**Step 4: Inspect accessibility behavior**

Use keyboard-only navigation to reach every control and confirm selected/expanded/current states are announced through the appropriate ARIA attributes.

**Step 5: Commit**

Run: `git add . && git commit -m "feat: complete StudyFlow component demo"`
