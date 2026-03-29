using VisionMasterH.Api.Configuration;

var builder = WebApplication.CreateBuilder(args);
const string ClientCorsPolicy = "ClientApplication";
var clientOrigins = new[] { "http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173" };

builder.WebHost.UseUrls("http://localhost:5099");

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.Converters.Add(
            new System.Text.Json.Serialization.JsonStringEnumConverter(System.Text.Json.JsonNamingPolicy.CamelCase)
        );
    });
builder.Services.AddVesselMonitoring(builder.Configuration);
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy(ClientCorsPolicy, policy =>
    {
        policy
            .WithOrigins(clientOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(ClientCorsPolicy);

app.MapControllers();

app.Run();
