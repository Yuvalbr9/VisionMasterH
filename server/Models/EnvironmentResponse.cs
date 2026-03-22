namespace VisionMasterH.Api.Models;

public sealed class EnvironmentResponse
{
    public RainLevel RainLevel { get; init; }

    public int WaveDirection { get; init; }

    public int SeaState { get; init; }
}