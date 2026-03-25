using Microsoft.AspNetCore.Mvc;
using VisionMasterH.Api.Abstractions;
using VisionMasterH.Api.Models;

namespace VisionMasterH.Api.Controllers;

[ApiController]
[Route("api/v1/environment")]
public sealed class EnvironmentController : ControllerBase
{
    private readonly IEnvironmentService environmentService;

    public EnvironmentController(IEnvironmentService environmentService)
    {
        this.environmentService = environmentService;
    }

    [HttpGet]
    [ProducesResponseType<EnvironmentResponse>(StatusCodes.Status200OK)]
    public ActionResult<EnvironmentResponse> Get()
    {
        Console.WriteLine("GET /api/v1/environment called");
        var environment = environmentService.GetEnvironment();
        Console.WriteLine($"GET /api/v1/environment result: {System.Text.Json.JsonSerializer.Serialize(environment)}");
        return Ok(environment);
    }
}