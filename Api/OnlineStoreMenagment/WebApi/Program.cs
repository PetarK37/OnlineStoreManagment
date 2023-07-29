using Domain.Interfaces.Repository;
using Domain.Interfaces.Service;
using Domain.Services;
using Domain.Validators;
using FluentValidation.AspNetCore;
using Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using WebApi.Middleware;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddPolicy(name: "AllowedOrigins", builder => builder.WithOrigins("*")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ShopDbContext>(opions => opions.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionString"), b => b.MigrationsAssembly("Infrastructure")));

builder.Services.AddControllers().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<StoreValidator>());
builder.Services.AddControllers().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<CategoryReqDTOValidator>());
builder.Services.AddControllers().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<DiscountCodeReqDTOValidator>());
builder.Services.AddControllers().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<AccessRightValidatior>());

builder.Services.AddScoped<IStoreRepository, StoreRepository>();
builder.Services.AddScoped<IStoreService, StoreService>();
builder.Services.AddScoped<ICategoryRepository,CategoryRepository>();
builder.Services.AddScoped<ICategoryService,CategoryService>();
builder.Services.AddScoped<IDiscountCodeRepository, DiscountCodeRepository>();
builder.Services.AddScoped<IDiscountCodeService, DiscountCodeService>();
builder.Services.AddScoped<IAccessRightRepository,AccesRightRepository>();
builder.Services.AddScoped<IAccessRightService,AccessRightService >();
builder.Services.AddScoped<IPermisionRepository, PermisionRepository>();
builder.Services.AddScoped<ISocialsRepository, SocialsRepository>();



builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

var app = builder.Build();
app.UseMiddleware(typeof(ExceptionMiddleware));

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
