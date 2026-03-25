using VisionMasterH.Api.Abstractions;
using VisionMasterH.Api.Models;

namespace VisionMasterH.Api.Services;

public sealed class EnvironmentService : IEnvironmentService
{
    private readonly IEnvironmentDataSource environmentDataSource;

    public EnvironmentService(IEnvironmentDataSource environmentDataSource)
    {
        this.environmentDataSource = environmentDataSource;
    }

    public EnvironmentResponse GetEnvironment()
    {
        return environmentDataSource.GetEnvironment();
    }
}