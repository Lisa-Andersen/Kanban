# Project instructions

This project is a Kanban board for planning and tracking a development process. Work moves through Backlog, ToDo, InProgress, QA, and Done. The board organizes Features and work items such as User Stories, Bugs, and Documentation; work items can have owners, dependencies, and Tasks. Preserve these relationships when changing the product. Keep each layer's data model appropriate to its purpose rather than assuming database, business, and frontend models must be identical.

The project has two parts:

- The React frontend is in `KanBanFrontend/`. Frontend-specific guidance is in [frontend.instructions.md](instructions/frontend.instructions.md) and applies to files in that folder.
- The ASP.NET Core backend is in `KanbanBackend/`. Backend-specific guidance is in [backend.instructions.md](instructions/backend.instructions.md) and applies to files in that folder.

## Shared development guidance

- Data flows from the frontend through backend controllers, services, and repositories to SQL Server. Keep each responsibility in its appropriate layer, and keep the API contract consistent across frontend and backend when it changes.
- Follow existing project patterns. Add or update focused tests for behavior changes and run the relevant validation commands from the frontend or backend instructions.
- Handle errors explicitly rather than silently swallowing them.
- Add comments when they explain why non-obvious logic exists or clarify important constraints or business rules. Avoid comments that merely restate obvious code, and keep comments up to date with behavior.
