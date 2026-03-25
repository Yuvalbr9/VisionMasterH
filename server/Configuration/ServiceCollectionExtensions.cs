using Microsoft.Extensions.Options;
using VisionMasterH.Api.Abstractions;
using VisionMasterH.Api.DataSources.Environment;
using VisionMasterH.Api.DataSources.Ownship;
using VisionMasterH.Api.DataSources.Targets;
using VisionMasterH.Api.Services;

namespace VisionMasterH.Api.Configuration;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddVesselMonitoring(this IServiceCollection services, IConfiguration configuration)
    {
        services
            .AddOptions<VesselMonitoringOptions>()
            .Bind(configuration.GetSection(VesselMonitoringOptions.SectionName));

        services.AddScoped<IEnvironmentService, EnvironmentService>();
        services.AddScoped<IOwnshipService, OwnshipService>();
        services.AddScoped<ITargetsService, TargetsService>();

        services.AddScoped<MockEnvironmentDataSource>();
        services.AddScoped<DatabaseEnvironmentDataSource>();
        services.AddScoped<MockOwnshipDataSource>();
        services.AddScoped<DatabaseOwnshipDataSource>();
        services.AddScoped<MockTargetsDataSource>();
        services.AddScoped<DatabaseTargetsDataSource>();

        services.AddScoped<IEnvironmentDataSource>(serviceProvider =>
        {
            var options = serviceProvider.GetRequiredService<IOptions<VesselMonitoringOptions>>().Value;

            return options.DataSourceMode switch
            {
                VesselDataSourceMode.Mock => serviceProvider.GetRequiredService<MockEnvironmentDataSource>(),
                VesselDataSourceMode.Database => serviceProvider.GetRequiredService<DatabaseEnvironmentDataSource>(),
                _ => throw new InvalidOperationException($"Unsupported data source mode: {options.DataSourceMode}"),
            };
        });

        services.AddScoped<IOwnshipDataSource>(serviceProvider =>
        {
            var options = serviceProvider.GetRequiredService<IOptions<VesselMonitoringOptions>>().Value;

            return options.DataSourceMode switch
            {
                VesselDataSourceMode.Mock => serviceProvider.GetRequiredService<MockOwnshipDataSource>(),
                VesselDataSourceMode.Database => serviceProvider.GetRequiredService<DatabaseOwnshipDataSource>(),
                _ => throw new InvalidOperationException($"Unsupported data source mode: {options.DataSourceMode}"),
            };
        });

        services.AddScoped<ITargetsDataSource>(serviceProvider =>
        {
            var options = serviceProvider.GetRequiredService<IOptions<VesselMonitoringOptions>>().Value;

            return options.DataSourceMode switch
            {
                VesselDataSourceMode.Mock => serviceProvider.GetRequiredService<MockTargetsDataSource>(),
                VesselDataSourceMode.Database => serviceProvider.GetRequiredService<DatabaseTargetsDataSource>(),
                _ => throw new InvalidOperationException($"Unsupported data source mode: {options.DataSourceMode}"),
            };
        });

        return services;
    }
}