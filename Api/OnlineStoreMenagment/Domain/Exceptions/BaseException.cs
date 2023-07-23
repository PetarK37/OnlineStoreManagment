using System.Net;


namespace Domain.Exceptions
{
    public class BaseException : Exception
    {
        public HttpStatusCode StatusCode { get; set; }
        public BaseException(string? message, HttpStatusCode code) : base(message)
        {
            StatusCode = code;
        }
    }
}
