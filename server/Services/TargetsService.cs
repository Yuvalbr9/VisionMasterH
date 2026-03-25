using System.Collections.Generic;
using System.Linq;
using VisionMasterH.Api.Abstractions;
using VisionMasterH.Api.Models;
using VisionMasterH.Api.Utilities;

namespace VisionMasterH.Api.Services;

public sealed class TargetsService : ITargetsService
{
    private readonly ITargetsDataSource targetsDataSource;
    private readonly IOwnshipDataSource ownshipDataSource;

    public TargetsService(ITargetsDataSource targetsDataSource, IOwnshipDataSource ownshipDataSource)
    {
        this.targetsDataSource = targetsDataSource;
        this.ownshipDataSource = ownshipDataSource;
    }

    public IReadOnlyList<Target> GetTargets()
    {
        var targets = targetsDataSource.GetTargets();
        var ownship = ownshipDataSource.GetOwnship().Ownship;

        return targets.Select(t => 
        {
            var relVe = NavigationPhysics.CalculateRelativeVelocityEast(t.VelocityEast, ownship.VelocityEast);
            var relVn = NavigationPhysics.CalculateRelativeVelocityNorth(t.VelocityNorth, ownship.VelocityNorth);
            
            return new Target
            {
                TargetId = t.TargetId,
                Position = t.Position,
                Dimensions = t.Dimensions,
                Heading = t.Heading,
                CourseOverGround = t.CourseOverGround,
                SpeedOverGround = t.SpeedOverGround,
                VelocityNorth = t.VelocityNorth,
                VelocityEast = t.VelocityEast,
                RelativeVelocityEast = relVe,
                RelativeVelocityNorth = relVn,
                RelativeSpeed = NavigationPhysics.CalculateRelativeSpeed(relVe, relVn),
                RelativeCourse = NavigationPhysics.CalculateRelativeCourse(relVe, relVn)
            };
        }).ToList();
    }
}