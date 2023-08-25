using System.Net;

namespace Domain.Exceptions
{
    public class EntityAlreadyExistsException : BaseException
    {
        public EntityAlreadyExistsException(string message) : base(message, HttpStatusCode.Conflict) { }
    }
}
