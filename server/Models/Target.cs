namespace VisionMasterH.Api.Models;

public sealed class Target
{
    public int TargetId { get; init; }

    public Position Position { get; init; } = new();

    public Dimensions Dimensions { get; init; } = new();

    public int Heading { get; init; }
}