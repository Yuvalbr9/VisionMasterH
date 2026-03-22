namespace VisionMasterH.Api.Configuration;

public sealed class VesselMonitoringOptions
{
    public const string SectionName = "VesselMonitoring";

    public VesselDataSourceMode DataSourceMode { get; init; } = VesselDataSourceMode.Mock;
}