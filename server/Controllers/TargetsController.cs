using Microsoft.AspNetCore.Mvc;
using VisionMasterH.Api.Abstractions;
using VisionMasterH.Api.Models;

namespace VisionMasterH.Api.Controllers;

[ApiController]
[Route("api/v1/targets")]
public sealed class TargetsController : ControllerBase
{
    private readonly ITargetsService targetsService;

    public TargetsController(ITargetsService targetsService)
    {
        this.targetsService = targetsService;
    }

    [HttpGet]
    [ProducesResponseType<IReadOnlyList<Target>>(StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<Target>> Get()
    {
        Console.WriteLine("GET /api/v1/targets called");
        var targets = targetsService.GetTargets();
        Console.WriteLine($"GET /api/v1/targets result: {System.Text.Json.JsonSerializer.Serialize(targets)}");
        return Ok(targets);
    }
}