using Microsoft.AspNetCore.Mvc;
using KanbanBackend.Models;
using KanbanBackend.Services.Interfaces;

namespace KanbanBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KanbanStatesController : ControllerBase
    {
        private readonly IKanbanStateService _service;

        public KanbanStatesController(IKanbanStateService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<KanbanState>>> GetAllKanbanStatesAsync()
        {
            var kanbanStates = await _service.GetAllKanbanStatesAsync();

            return Ok(kanbanStates);
        }
    }
}