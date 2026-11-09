# IBCM SuperEduAI

Student dashboard frontend for the AI-Powered Educational Platform for
International Business College Mitrovica (IBCM). This project currently uses a
frontend-only demonstration: it has no authentication, backend, live course
catalog, college announcements, assignment schedule, or connected AI service.

## Start and verify

```sh
npm install
npm run dev
```

```sh
npm run build
npx tsc -b --pretty false
npm run lint
```

## Source structure

```text
src/
  components/   Sidebar, header, cards, tutor, controls, and icons
  data/         Navigation and explicitly labeled preview-only sample content
  layouts/      Responsive application shell
  pages/        Dashboard and section views
  styles/       Shared color, spacing, radius, and surface tokens
  types/        Navigation, course, icon, and theme types
  App.tsx       Section navigation, theme, course selection, local tutor demo
  App.css       Responsive dashboard and component styles
  index.css     Global reset, typography, focus, and reduced-motion defaults
  main.tsx      React DOM entry point
```

Navigation uses local page state because no router was present. Sidebar links,
course previews, quick actions, search, notifications, profile menu, and the
theme toggle work in the frontend. The tutor accepts and displays messages in
the current page session, then shows an explicit placeholder response; it does
not call or simulate an AI service.

Content in `src/data/dashboardDemo.ts` is illustrative only. Course names,
progress, assignment, and announcements are not live IBCM data. No assignment
due date is shown because none was provided. Replace this data module with a
future backend adapter when API contracts are available.
