using VisionMasterH.Api.Abstractions;
using VisionMasterH.Api.Models;

namespace VisionMasterH.Api.DataSources.Targets;

public sealed class DatabaseTargetsDataSource : ITargetsDataSource
{
    public IReadOnlyList<Target> GetTargets()
    {
        throw new NotImplementedException("Database-backed target retrieval is not implemented yet.");
    }
}