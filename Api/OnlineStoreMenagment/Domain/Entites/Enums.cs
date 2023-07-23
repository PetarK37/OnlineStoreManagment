namespace Domain.Entites
{
    public class Enums
    {
        public enum EPermision { READ, WRITE }
        public enum ObjectName { COSTUMER_ORDER, SUPLIER_ORDER, ANYLITICS, INVENTORY, PROMO_CODE }
        public enum OrderStatus { IN_PROCESS, SENT, RETURNED, RECIVED }
        public enum Role { ADMIN, EMPLOYEE }
    }
}
