using VisionMasterH.Api.Models;

namespace VisionMasterH.Api.Abstractions;

public interface IEnvironmentService
{
    EnvironmentResponse GetEnvironment();
}