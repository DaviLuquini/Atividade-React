# React Router no StudyFlow — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add real client-side navigation with React Router while preserving the StudyFlow dashboard, six required components, responsive layout, and global Toast Context.

**Architecture:** Wrap the app with `BrowserRouter`, keep `ToastProvider` above the route tree, and move shared sidebar/header behavior into a layout rendered through `Outlet`. Use focused page components for dashboard, activities, resources, and not-found states; reuse existing interactive components through props.

**Tech Stack:** React, `react-router-dom`, Vite, JavaScript/JSX, Context API, CSS.

---

### Task 1: Install React Router

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Step 1: Establish the baseline**

Run: `npm run build`
Expected: PASS before the dependency change.

**Step 2: Install the dependency**

Run: `npm install react-router-dom`
Expected: npm updates both manifests and installs the package without dependency errors.

**Step 3: Verify the dependency**

Run: `npm run build`
Expected: PASS; the dependency is available for imports.

### Task 2: Add route entry points and shared layout

**Files:**
- Create: `src/layouts/AppLayout.jsx`
- Create: `src/pages/NotFoundPage.jsx`
- Modify: `src/main.jsx`
- Modify: `src/App.jsx`

**Step 1: Define the route contract**

The route tree must contain `/`, `/atividades`, `/recursos`, and `*`, with an `AppLayout` parent. `ToastProvider` must remain above `BrowserRouter` or wrap the router without losing global context.

**Step 2: Implement the router**

Import `BrowserRouter`, `Routes`, `Route`, `Navigate`, and `Outlet` as needed. Move the existing sidebar/header/menu shell into `AppLayout`, render `<Outlet />` in the main content area, and preserve the existing Toast component at the shared shell level.

**Step 3: Implement not-found behavior**

Render a semantic 404 panel with a `Link` back to `/`. Do not silently render an empty page for unknown URLs.

**Step 4: Run the build**

Run: `npm run build`
Expected: PASS with all route imports resolved.

### Task 3: Create dashboard and activities pages

**Files:**
- Create: `src/pages/DashboardPage.jsx`
- Create: `src/pages/ActivitiesPage.jsx`
- Modify: `src/App.jsx`

**Step 1: Move dashboard content**

Place the current welcome row, metrics, progress panel, FAQ, and overview content in `DashboardPage`. Preserve `ProgressBar`, `Accordion`, and Toast behavior.

**Step 2: Create the activities route**

Move activity data/filter/page state into `ActivitiesPage`. Render `Dropdown`, `Tabs`, `Pagination`, and activity rows using the same props and callbacks. Ensure changing the filter resets the page to 1.

**Step 3: Keep the route tree declarative**

Make `App.jsx` contain the route definitions only, rather than duplicating route state or navigation markup.

**Step 4: Run the build**

Run: `npm run build`
Expected: PASS.

### Task 4: Create resources page and wire navigation

**Files:**
- Create: `src/pages/ResourcesPage.jsx`
- Modify: `src/layouts/AppLayout.jsx`
- Modify: `src/styles.css`

**Step 1: Implement the resources page**

Render resource cards, a short study-help section, and the existing FAQ `Accordion` or toast actions so the page remains meaningful and demonstrates props/state.

**Step 2: Replace hash links**

Use `NavLink` for Dashboard, Atividades, and Recursos. Add active styling based on `isActive`, proper route destinations, and close the mobile menu after navigation.

**Step 3: Handle existing secondary menu items**

Either link them to the closest real page or provide an explicit toast saying the area is planned; do not leave dead controls or invalid hash targets.

**Step 4: Style route states**

Add styles for active navigation, route page headings, not-found panel, and any mobile navigation changes without breaking current breakpoints.

**Step 5: Run the build**

Run: `npm run build`
Expected: PASS.

### Task 5: Validate route behavior and accessibility

**Files:**
- Verify: `src/main.jsx`
- Verify: `src/App.jsx`
- Verify: `src/layouts/AppLayout.jsx`
- Verify: `src/pages/*.jsx`

**Step 1: Run the production build**

Run: `npm run build`
Expected: PASS with no unresolved imports.

**Step 2: Run the development server**

Run: `npm run dev -- --host 0.0.0.0`
Expected: Vite reports a reachable local URL.

**Step 3: Manually test all routes**

Open `/`, `/atividades`, `/recursos`, and an unknown path. Confirm navigation changes the URL without a full reload, the active `NavLink` is visible, and the 404 link returns to the dashboard.

**Step 4: Test preserved interactions**

On the dashboard verify progress, accordion, toast, and mobile menu. On activities verify filtering, tabs, pagination, and keyboard tab navigation. Confirm Toast Context works from more than one page.

**Step 5: Test responsive behavior**

Check approximately 375px, 768px, and 1440px widths. Confirm the menu opens/closes, links remain reachable, content has no horizontal overflow, and focus remains visible.
