using VisionMasterH.Api.Abstractions;
using VisionMasterH.Api.Models;

namespace VisionMasterH.Api.DataSources.Environment;

public sealed class MockEnvironmentDataSource : IEnvironmentDataSource
{
    public EnvironmentResponse GetEnvironment()
    {
        return new EnvironmentResponse
        {
            RainLevel = RainLevel.Medium,
            WaveDirection = 180,
            SeaState = 4,
        };
    }
}