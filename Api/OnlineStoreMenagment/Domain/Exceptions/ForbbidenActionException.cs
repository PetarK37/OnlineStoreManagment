using System.Net;

namespace Domain.Exceptions
{
    internal class ForbbidenActionException : BaseException
    {
        public ForbbidenActionException(string? message) : base(message, HttpStatusCode.MethodNotAllowed)
        {
        }
    }
}
