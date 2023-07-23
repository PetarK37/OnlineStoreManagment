using System.Net;

namespace Domain.Exceptions 
{
    public class ActionFailedException : BaseException
    {
        public ActionFailedException(string message) : base(message,HttpStatusCode.BadRequest) { }

    }
}
