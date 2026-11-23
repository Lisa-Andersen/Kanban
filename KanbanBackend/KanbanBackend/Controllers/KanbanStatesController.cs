
using Microsoft.AspNetCore.Mvc;

namespace KanbanBackend.Controllers;

[ApiController]
[Route("api/kanbanstates")]
public class KanbanStatesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetKanbanStates()
    {
        return StatusCode(501, "Not implemented yet");
    }
}
