using Microsoft.AspNetCore.Mvc;
using VisionMasterH.Api.Abstractions;
using VisionMasterH.Api.Models;

namespace VisionMasterH.Api.Controllers;

[ApiController]
[Route("api/v1/ownship")]
public sealed class OwnshipController : ControllerBase
{
    private readonly IOwnshipService ownshipService;

    public OwnshipController(IOwnshipService ownshipService)
    {
        this.ownshipService = ownshipService;
    }

    [HttpGet]
    [ProducesResponseType<OwnshipResponse>(StatusCodes.Status200OK)]
    public ActionResult<OwnshipResponse> Get()
    {
        Console.WriteLine("GET /api/v1/ownship called");
        var ownship = ownshipService.GetOwnship();
        Console.WriteLine($"GET /api/v1/ownship result: {System.Text.Json.JsonSerializer.Serialize(ownship)}");
        return Ok(ownship);
    }
}