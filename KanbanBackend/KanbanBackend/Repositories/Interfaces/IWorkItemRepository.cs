namespace KanbanBackend.Repositories.Interfaces;

public interface IWorkItemRepository
{
    Task GetAllWorkItemsAsync();
}