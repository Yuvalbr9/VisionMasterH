namespace VisionMasterH.Api.Models;

public sealed class Target
{
    public int TargetId { get; init; }

    public Position Position { get; init; } = new();

    public Dimensions Dimensions { get; init; } = new();

    public int Heading { get; init; }

    // Navigation and physics data calculated by absolute velocities
    public double CourseOverGround { get; init; }
    public double SpeedOverGround { get; init; }
    public double VelocityNorth { get; init; }
    public double VelocityEast { get; init; }

    // Relative vectors natively pre-calculated relative against the Ownship center
    public double RelativeVelocityNorth { get; init; }
    public double RelativeVelocityEast { get; init; }
    public double RelativeSpeed { get; init; }
    public double RelativeCourse { get; init; }

    // Placeholders for missing values, specifically requested to not break execution
    // Can be swapped out later when integrated with data streams
    public const double PLACEHOLDER_V_N = 10.5;
    public const double PLACEHOLDER_V_E = -2.3;
}