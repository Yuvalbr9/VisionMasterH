using VisionMasterH.Api.Models;

namespace VisionMasterH.Api.Abstractions;

public interface ITargetsService
{
    IReadOnlyList<Target> GetTargets();
}