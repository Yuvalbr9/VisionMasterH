using VisionMasterH.Api.Models;

namespace VisionMasterH.Api.Abstractions;

public interface ITargetsDataSource
{
    IReadOnlyList<Target> GetTargets();
}