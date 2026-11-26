using KanbanBackend.Models;
using KanbanBackend.Repositories.Interfaces;
using KanbanBackend.Services.Interfaces;

namespace KanbanBackend.Services
{
    public class KanbanStateService : IKanbanStateService
    {
        private readonly IKanbanStateRepository _repository;

        public KanbanStateService(IKanbanStateRepository repository)
        {
            _repository = repository;
        }

        public Task<List<KanbanState>> GetAllKanbanStatesAsync()
        {
            return _repository.GetAllKanbanStatesAsync();
        }
    }
}