using Domain.Interfaces.Repository;
using Domain.Interfaces.Service;
using Domain.Services;
using Domain.Validators;
using FluentValidation.AspNetCore;
using Infrastructure.Interfaces;
using Infrastructure.Jobs;
using Infrastructure.Persistance.Context;
using Infrastructure.Persistance.Repositories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Quartz;
using System.Text;
using System.Text.Json.Serialization;
using WebApi.Middleware;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => options.AddPolicy(name: "AllowedOrigins", builder => builder.WithOrigins("*")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ShopDbContext>(opions => opions.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionString"), b => b.MigrationsAssembly("Infrastructure")));

builder.Services.AddScoped<IStoreRepository, StoreRepository>();
builder.Services.AddScoped<IStoreService, StoreService>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IDiscountCodeRepository, DiscountCodeRepository>();
builder.Services.AddScoped<IDiscountCodeService, DiscountCodeService>();
builder.Services.AddScoped<IAccessRightRepository, AccesRightRepository>();
builder.Services.AddScoped<IAccessRightService, AccessRightService>();
builder.Services.AddScoped<IPermisionRepository, PermisionRepository>();
builder.Services.AddScoped<ISocialsRepository, SocialsRepository>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IAuthentificationService, AuthentificationService>();
builder.Services.AddScoped<ISupplierOrderRepository, SupplierOrderRepository>();
builder.Services.AddScoped<ISupplierOrderService, SupplierOrderService>();
builder.Services.AddScoped<IItemRepository, ItemRepository>();
builder.Services.AddScoped<IItemService, ItemService>();
builder.Services.AddScoped<ICustomerOrderService, CustomerOrderService>();
builder.Services.AddScoped<ICustomerOrderRepository, CustomerOrderRepository>();
builder.Services.AddScoped<IMailService, MailService>();
builder.Services.AddScoped<IAnylticsService, AnylticsService>();

builder.Services.AddControllers().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<StoreValidator>());
builder.Services.AddControllers().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<CategoryReqDTOValidator>());
builder.Services.AddControllers().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<DiscountCodeReqDTOValidator>());
builder.Services.AddControllers().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<AccessRightValidatior>());
builder.Services.AddControllers().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<EmployeeReqDTOValidator>());
builder.Services.AddControllers().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<EmployeeValidator>());
builder.Services.AddControllers().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<SupplierOrderReqDTOValidator>());
builder.Services.AddControllers().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<ItemReqDTOValidator>());
builder.Services.AddControllers().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<CustomerOrderDTOValidator>());
builder.Services.AddControllers().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<ItemValidator>());
builder.Services.AddControllers().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<PriceValidator>());

builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

DotNetEnv.Env.Load();
builder.Services.AddQuartz(q =>
{
    q.UseMicrosoftDependencyInjectionJobFactory();
    q.AddJobAndTrigger<DisputeReminderJob>(builder.Configuration);
});

builder.Services.AddQuartzHostedService(
    q => q.WaitForJobsToComplete = true
);

builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "OnlineStore", Version = "v1" });

    // Add security definition
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter JWT token only",
    };
    c.AddSecurityDefinition("Bearer", securityScheme);

    // Apply the security requirements globally
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware(typeof(ExceptionMiddleware));
app.UseMiddleware(typeof(PermissionMiddleware));


if (builder.Configuration["Environment"].Equals("Development"))
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
