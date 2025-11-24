using Microsoft.EntityFrameworkCore;
using Orders.Api.Data;
using Orders.Api.Models;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        x => x.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

// DB
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

// Publisher
builder.Services.AddSingleton<OrderPublisher>();

// Healthchecks
builder.Services.AddHealthChecks()
    .AddNpgSql(builder.Configuration.GetConnectionString("Default"))
    .AddAzureServiceBusQueue(
        builder.Configuration["ServiceBus:Connection"],
        builder.Configuration["ServiceBus:Queue"]
    );

var app = builder.Build();

// CORS
app.UseCors("AllowAll");

// ENDPOINTS
app.MapGet("/orders", async (AppDbContext db) => await db.Orders.ToListAsync());
app.MapGet("/orders/{id}", async (int id, AppDbContext db) => await db.Orders.FindAsync(id));

app.MapPost("/orders", async (Order order, AppDbContext db, OrderPublisher publisher) =>
{
    db.Orders.Add(order);
    await db.SaveChangesAsync();
    await publisher.PublishAsync(order.Id);
    return Results.Created($"/orders/{order.Id}", order);
});

app.MapHealthChecks("/health");

// CRIAR TABELAS AUTOMATICAMENTE
using (var scope = app.Services.CreateScope())
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        db.Database.EnsureCreated();
    }
    catch (Exception ex)
    {
        logger.LogWarning(ex, "Não foi possível conectar ao banco para EnsureCreated. Continuando sem criar o banco.");
    }
}

app.Run();
