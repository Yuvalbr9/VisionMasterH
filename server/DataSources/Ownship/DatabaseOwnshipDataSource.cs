using VisionMasterH.Api.Abstractions;
using VisionMasterH.Api.Models;

namespace VisionMasterH.Api.DataSources.Ownship;

public sealed class DatabaseOwnshipDataSource : IOwnshipDataSource
{
    public OwnshipResponse GetOwnship()
    {
        throw new NotImplementedException("Database-backed ownship retrieval is not implemented yet.");
    }
}