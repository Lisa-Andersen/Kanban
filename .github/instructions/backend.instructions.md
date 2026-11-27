---
applyTo: "KanbanBackend/**"
---

# Backend instructions

## Tech stack

- C# and ASP.NET Core Web API on .NET 10.
- Microsoft SQL Server, accessed with `Microsoft.Data.SqlClient`.
- MSTest for automated tests.

## Project structure

- `KanbanBackend/Controllers/`: HTTP endpoints and request handling.
- `KanbanBackend/Services/`: business logic and service interfaces.
- `KanbanBackend/Repositories/`: data access and repository interfaces.
- `KanbanBackend/Models/`: backend domain and data models.
- `KanbanBackend/Database/`: SQL database setup scripts.
- `KanbanBackend.Tests/`: automated tests.
- `KanbanBackend/KanbanBackend.http`: example HTTP requests for the API.

Follow these layers when adding or changing functionality. Keep HTTP handling, business logic, and data access in their respective layers.

## Testing

- Keep tests in the separate `KanbanBackend.Tests/` project, mirroring the production folders. For example, put controller tests in `KanbanBackend.Tests/Controllers/`, service tests in `KanbanBackend.Tests/Services/`, and repository tests in `KanbanBackend.Tests/Repositories/`.
- Use MSTest and follow existing test setup and naming conventions.
- Structure each test in Arrange, Act, Assert order, with a comment line above each section:

  ```csharp
  // Arrange
  // Act
  // Assert
  ```

- Add or update tests for changed behavior, including relevant validation and error cases. Keep unit tests independent of a live database; use an explicit integration test when database behavior needs verification.
- Run `dotnet test KanbanBackend.slnx` from `KanbanBackend/`.

## Commands

Run these from the `KanbanBackend/` directory:

```sh
dotnet restore KanbanBackend.slnx
dotnet build KanbanBackend.slnx
dotnet test KanbanBackend.slnx
dotnet run --project KanbanBackend/KanbanBackend.csproj
```

## API and product guidance

Keep API responses and validation consistent with the frontend contract and the project concepts described in the main project instructions. Do not assume database, business, and frontend models must have identical shapes.
