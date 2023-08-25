namespace Domain.Entites
{
    public class Enums
    {
        public enum EPermision { READ, WRITE }
        public enum ObjectName { COSTUMER_ORDER, SUPPLIER_ORDER, ANYLITICS, ITEM, PROMO_CODE,CATEGORY,ALL }
        public enum OrderStatus { IN_PROCESS, SENT, RETURNED, RECIVED }
        public enum Role { ADMIN, EMPLOYEE }
    }
}
