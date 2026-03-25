using VisionMasterH.Api.Abstractions;
using VisionMasterH.Api.Models;
using VisionMasterH.Api.Utilities;

namespace VisionMasterH.Api.DataSources.Targets;

public sealed class MockTargetsDataSource : ITargetsDataSource
{
    public IReadOnlyList<Target> GetTargets()
    {
        return
        [
            new Target
            {
                TargetId = 101,
                Position = new Position
                {
                    Latitude = 32.0853,
                    Longitude = 34.7818,
                },
                Dimensions = new Dimensions
                {
                    Length = 15.5,
                    Width = 4.2,
                    Height = 3.0,
                },
                Heading = 45,
                VelocityNorth = Target.PLACEHOLDER_V_N,
                VelocityEast = Target.PLACEHOLDER_V_E,
                CourseOverGround = NavigationPhysics.CalculateCog(Target.PLACEHOLDER_V_N, Target.PLACEHOLDER_V_E),
                SpeedOverGround = NavigationPhysics.CalculateSog(Target.PLACEHOLDER_V_N, Target.PLACEHOLDER_V_E),
            },
            new Target
            {
                TargetId = 202,
                Position = new Position
                {
                    Latitude = 32.0989,
                    Longitude = 34.7657,
                },
                Dimensions = new Dimensions
                {
                    Length = 28.0,
                    Width = 6.4,
                    Height = 8.6,
                },
                Heading = 121,
                VelocityNorth = Target.PLACEHOLDER_V_N,
                VelocityEast = Target.PLACEHOLDER_V_E,
                CourseOverGround = NavigationPhysics.CalculateCog(Target.PLACEHOLDER_V_N, Target.PLACEHOLDER_V_E),
                SpeedOverGround = NavigationPhysics.CalculateSog(Target.PLACEHOLDER_V_N, Target.PLACEHOLDER_V_E),
            },
            new Target
            {
                TargetId = 303,
                Position = new Position
                {
                    Latitude = 32.0641,
                    Longitude = 34.7922,
                },
                Dimensions = new Dimensions
                {
                    Length = 42.3,
                    Width = 9.1,
                    Height = 12.5,
                },
                Heading = 312,
                VelocityNorth = Target.PLACEHOLDER_V_N,
                VelocityEast = Target.PLACEHOLDER_V_E,
                CourseOverGround = NavigationPhysics.CalculateCog(Target.PLACEHOLDER_V_N, Target.PLACEHOLDER_V_E),
                SpeedOverGround = NavigationPhysics.CalculateSog(Target.PLACEHOLDER_V_N, Target.PLACEHOLDER_V_E),
            },
        ];
    }
}