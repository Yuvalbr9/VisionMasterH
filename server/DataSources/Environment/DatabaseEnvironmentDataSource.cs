using VisionMasterH.Api.Abstractions;
using VisionMasterH.Api.Models;

namespace VisionMasterH.Api.DataSources.Environment;

public sealed class DatabaseEnvironmentDataSource : IEnvironmentDataSource
{
    public EnvironmentResponse GetEnvironment()
    {
        throw new NotImplementedException("Database-backed environment retrieval is not implemented yet.");
    }
}