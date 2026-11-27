---
applyTo: "KanBanFrontend/**"
---

# Frontend instructions

## Tech stack

- TypeScript and React 19.
- Vite for development and production builds.
- ESLint for linting.

## Project structure

- `src/app/`: application entry point and root component.
- `src/components/`: shared layout and UI components.
- `src/features/<feature>/`: feature-specific  visual components, hooks, services, and project specific types.
- `src/services/`: shared API and application services.
- `src/types/`: shared TypeScript types for the API.

Keep feature code with its feature and use shared components and services where appropriate.

## Testing


## Commands

Run these from the `KanBanFrontend/` directory:

```sh
npm run dev
npm run lint
npm run build
npm run preview
```

## API and product guidance

Treat the backend API contract as authoritative and keep API calls and their types consistent with it. Follow the project concepts described in the main project instructions; do not invent product behavior that is not defined there or in the existing code.
