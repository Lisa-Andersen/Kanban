namespace KanbanBackend.Models;
public abstract record WorkItem(int Id, string Title, string Description, State State, Priority Priority, List<WorkTask> Tasks);

public record UserStory(int Id, string Title, string Description, State State, Priority Priority, List<WorkTask> Tasks)
    : WorkItem(Id, Title, Description, State, Priority, Tasks);
    
public record Bug(int Id, string Title, string Description, State State, Priority Priority, List<WorkTask> Tasks, List<UserStory> Bugs)
    : WorkItem(Id, Title, Description, State, Priority, Tasks);