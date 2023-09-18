
using System.Net;

namespace Domain.Exceptions
{
    public class EntityNotFoundException : BaseException
    {
        public EntityNotFoundException(string? message) : base(message, HttpStatusCode.NotFound)
        {
        }
    }
}
