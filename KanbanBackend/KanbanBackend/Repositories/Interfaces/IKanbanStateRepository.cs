using KanbanBackend.Models;
namespace KanbanBackend.Repositories.Interfaces
{
    public interface IKanbanStateRepository
    {
        Task<List<KanbanState>> GetAllKanbanStatesAsync();
    }
}
