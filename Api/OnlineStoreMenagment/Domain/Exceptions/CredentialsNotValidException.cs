using System.Net;

namespace Domain.Exceptions
{
    public class CredentialsNotValidException : BaseException
    {
        public CredentialsNotValidException(string? message) : base(message, HttpStatusCode.MethodNotAllowed)
        {
        }
    }
}
