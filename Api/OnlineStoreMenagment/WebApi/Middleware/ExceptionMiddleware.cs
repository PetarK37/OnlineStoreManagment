using Domain.Exceptions;
using System.Net;
using System.Text.Json;

namespace WebApi.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task Invoke(HttpContext context, ILogger<ExceptionMiddleware> logger)
        {
            try
            {
                await _next(context);
            }
            catch (BaseException ex)
            {
                logger.LogError(ex, "An unhandled exception has occurred.");
                await HandleExceptionAsync(context, ex);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An unhandled exception has occurred.");
                await HandleExceptionAsync(context, ex);
            }
        }
        private static async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            {
                var response = context.Response;
                response.ContentType = "application/json";
                string jsonApiResponse;
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                jsonApiResponse = JsonSerializer.Serialize(
                    new
                    {
                        Type = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500",
                        Title = "Internal server error.",
                        Status = 500,
                        Detail = ex.Message,
                        Instance = $"{context.Request.Path}"
                    });

                response.ContentLength = jsonApiResponse.Length;
                await response.WriteAsync(jsonApiResponse);
            }

        }

        private static async Task HandleExceptionAsync(HttpContext context, BaseException ex)
        {
            var response = context.Response;
            response.ContentType = "application/json";
            string jsonApiResponse;
            response.StatusCode = (int)HttpStatusCode.InternalServerError;
            jsonApiResponse = JsonSerializer.Serialize(
                new
                {
                    Type = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/" + (int)ex.StatusCode,
                    Title = "Internal server error.",
                    Status = ex.StatusCode,
                    Detail = ex.Message,
                    Instance = $"{context.Request.Path}"
                });

            response.ContentLength = jsonApiResponse.Length;
            await response.WriteAsync(jsonApiResponse);
        }
    }
}
