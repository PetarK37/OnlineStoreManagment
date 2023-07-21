using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entites
{
    internal class Enums
    {
        public enum Permision { READ, WRITE }
        public enum ObjectName { COSTUMER_ORDER, SUPLIER_ORDER, ANYLITICS, INVENTORY, PROMO_CODE }
        public enum OrderStatus { IN_PROCESS, SENT, RETURNED, RECIVED }
        public enum Role { ADMIN, EMPLOYEE }
    }
}
