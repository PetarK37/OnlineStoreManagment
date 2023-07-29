using Domain.Entites;
using Domain.Exceptions;
using Domain.Interfaces.Repository;
using Domain.Interfaces.Service;

namespace Domain.Services
{
    public class AccessRightService : IAccessRightService
    {
        private readonly IAccessRightRepository _accessRightRepository;
        private readonly IPermisionRepository _permisionRepository;


        public AccessRightService(IAccessRightRepository accessRightRepository, IPermisionRepository permisionRepository)
        {
            _accessRightRepository = accessRightRepository;
            _permisionRepository = permisionRepository;
        }

        public async Task<AccessRight> Add(AccessRight accessRight)
        {
            //Since it can not have duplicates and we will only ever have two Permissions this is ok
            var existingRight = _accessRightRepository.GetBy(ar =>
                    ar.ObjectName.Equals(accessRight.ObjectName) &&
                    ar.Permisions.Count == accessRight.Permisions.Count).FirstOrDefault();

            if (existingRight is not null)
            {
                return existingRight;
            }

            var permissionList = new HashSet<Permision>();
            foreach(var p in accessRight.Permisions)
            {
                var existingPermission = _permisionRepository.GetBy(per => per.Type == p.Type).FirstOrDefault();
                if(existingPermission is not null)
                {
                    permissionList.Add(existingPermission);
                }
                else
                {
                    permissionList.Add(p);
                }
            }
            accessRight.Permisions = permissionList;
            _accessRightRepository.Add(accessRight);
            var success = await _accessRightRepository.SaveAsync();
            return success > 0 ? accessRight : throw new ActionFailedException("There was a problem while saving AccessRight ");
        }
    }
}
