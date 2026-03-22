using VisionMasterH.Api.Abstractions;
using VisionMasterH.Api.Models;

namespace VisionMasterH.Api.DataSources.Ownship;

public sealed class MockOwnshipDataSource : IOwnshipDataSource
{
    public OwnshipResponse GetOwnship()
    {
        return new OwnshipResponse
        {
            Ownship = new Target
            {
                TargetId = 1,
                Position = new Position
                {
                    Latitude = 32.0735,
                    Longitude = 34.7750,
                },
                Dimensions = new Dimensions
                {
                    Length = 22.0,
                    Width = 5.5,
                    Height = 4.0,
                },
                Heading = 90,
            },
        };
    }
}