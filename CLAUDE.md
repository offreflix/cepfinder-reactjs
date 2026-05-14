# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev         # Dev server at http://localhost:5173
pnpm build       # Type-check + production build (tsc -b && vite build)
pnpm preview     # Preview production build locally
pnpm test        # Vitest run (single pass)
pnpm test:watch  # Vitest in watch mode
pnpm lint        # ESLint
pnpm format      # Prettier (src/**/*.{ts,tsx,css})
```

## Architecture

CEP Finder is a single-page React app that looks up Brazilian postal codes via the [ViaCEP](https://viacep.com.br) public API.

**Data flow:**
1. `Input.tsx` owns the text field state and makes the API call (`src/services/api.ts` — pre-configured Axios instance with `baseURL: 'https://viacep.com.br/ws/'`).
2. On success, `Input` calls `props.handleCep(response.data)` to lift the result up to `App`.
3. `App` holds the single `cep` state object and passes it down to `Main` for display.
4. When ViaCEP returns `{ erro: true }`, `Input` fires a SweetAlert2 error dialog.

**Stack:** React 18, Axios 1.x, react-icons (Feather), sweetalert2, Vite 6, TypeScript 5, Vitest. No router, no state management library.

**Tooling:** ESLint 9 flat config (`eslint.config.js`), Prettier (`.prettierrc`).
