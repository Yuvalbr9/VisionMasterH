using VisionMasterH.Api.Abstractions;
using VisionMasterH.Api.Models;

namespace VisionMasterH.Api.Services;

public sealed class OwnshipService : IOwnshipService
{
    private readonly IOwnshipDataSource ownshipDataSource;

    public OwnshipService(IOwnshipDataSource ownshipDataSource)
    {
        this.ownshipDataSource = ownshipDataSource;
    }

    public OwnshipResponse GetOwnship()
    {
        return ownshipDataSource.GetOwnship();
    }
}