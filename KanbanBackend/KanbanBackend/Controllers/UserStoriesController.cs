
using Microsoft.AspNetCore.Mvc;

namespace KanbanBackend.Controllers;

[ApiController]
[Route("api/userstories")]
public class UserStoriesController : ControllerBase
{
    [HttpPost]
    public IActionResult NewUserStory()
    {
        return StatusCode(501, "Not implemented yet");
    }

    [HttpPut("{id}")]
    public IActionResult UpdateUserStory(int id)
    {
        return StatusCode(501, "Not implemented yet");
    }

    [HttpPut("{id}/move")]
    public IActionResult MoveUserStory(int id)
    {
        return StatusCode(501, "Not implemented yet");
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUserStory(int id)
    {
        return StatusCode(501, "Not implemented yet");
    }
}
