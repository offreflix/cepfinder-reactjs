# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Dev server at http://localhost:3000
npm run build    # Production build
npm test         # Jest in interactive watch mode
```

## Architecture

CEP Finder is a single-page React app that looks up Brazilian postal codes via the [ViaCEP](https://viacep.com.br) public API.

**Data flow:**
1. `Input.js` owns the text field state and makes the API call (`src/services/api.js` — pre-configured Axios instance with `baseURL: 'https://viacep.com.br/ws/'`).
2. On success, `Input` calls `props.handleCep(response.data)` to lift the result up to `App`.
3. `App` holds the single `cep` state object and passes it down to `Main` for display.
4. After the API call, `Input` also runs `verification(response)` from `src/actions/inputActions.js`, which triggers a sweetalert error dialog when ViaCEP returns an object with only one key (the `erro` field — meaning an invalid CEP).

**Stack:** React 17, Axios, react-icons (Feather), sweetalert, Create React App (react-scripts 5). No TypeScript, no router, no state management library.
