# LegalMet AI — Prototype

Packaged commodity compliance console for Legal Metrology officers (SIH, Problem Statement 26034).
Built with React + Vite. Everything is front-end only: the "AI/OCR analysis" is a simulated sequence so the full officer flow can be demoed.

## Run in VS Code

1. Install Node.js 18 or newer.
2. Open this folder in VS Code (`File → Open Folder`).
3. In the integrated terminal:

```bash
npm install
npm run dev
```

The app opens at http://localhost:5173. Login with any credentials (the demo is pre-filled).

## Flow

Login → Dashboard → Scan Product → Upload Images → Analysis → Compliance Result → Evidence → Report

Plus: Inspection History, Inspection Detail (Result / Evidence / Report / Activity tabs), Rules, Profile / Settings.

## Project structure

```
src/
  App.jsx               routes
  data.js               demo inspections, rules, officer
  styles.css            design tokens + component styles
  overrides.css         layout and print tweaks
  lib/auth.js           demo session helper
  components/           Layout, Sidebar, StatusPill, Breadcrumb
  pages/                one file per screen
```

## Notes

- **Download PDF** opens the browser print dialog (choose "Save as PDF"); the report is styled for print.
- **Export** downloads the inspection as a JSON file.
- **Edit report** lets the officer add remarks that appear in the report.
- To change demo data (products, findings, rule version), edit `src/data.js`.
