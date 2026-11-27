namespace KanbanBackend.Models;

public record Feature(int Id, string Title, string Description, bool Status, List<WorkItem> WorkItems);