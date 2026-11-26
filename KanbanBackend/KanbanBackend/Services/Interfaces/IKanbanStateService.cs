using KanbanBackend.Models;

namespace KanbanBackend.Services.Interfaces
{
    public interface IKanbanStateService
    {
        Task<List<KanbanState>> GetAllKanbanStatesAsync();
    }
}
