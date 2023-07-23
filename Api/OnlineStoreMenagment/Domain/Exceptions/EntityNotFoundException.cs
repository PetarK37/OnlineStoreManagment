
using System.Net;

namespace Domain.Exceptions
{
    internal class EntityNotFoundException : BaseException
    {
        public EntityNotFoundException(string? message) : base(message, HttpStatusCode.NotFound)
        {
        }
    }
}
