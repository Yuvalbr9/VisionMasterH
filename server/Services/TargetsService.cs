using VisionMasterH.Api.Abstractions;
using VisionMasterH.Api.Models;

namespace VisionMasterH.Api.Services;

public sealed class TargetsService : ITargetsService
{
    private readonly ITargetsDataSource targetsDataSource;

    public TargetsService(ITargetsDataSource targetsDataSource)
    {
        this.targetsDataSource = targetsDataSource;
    }

    public IReadOnlyList<Target> GetTargets()
    {
        return targetsDataSource.GetTargets();
    }
}