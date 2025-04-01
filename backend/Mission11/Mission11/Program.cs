using Microsoft.EntityFrameworkCore;
using Mission11.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//connect to database
builder.Services.AddDbContext<BookDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("BookConnection")));

//enable program to use Cors
builder.Services.AddCors(options =>
    options.AddPolicy("AllowReactAppBlah",
    policy => {
        policy.WithOrigins("http://localhost:3000", "https://gentle-rock-05f5f901e.6.azurestaticapps.net")
        .AllowAnyMethod()
        .AllowAnyHeader();
    }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//accept requests from port 3000
app.UseCors("AllowReactAppBlah");

app.UseAuthorization();

app.MapControllers();

app.Run();
