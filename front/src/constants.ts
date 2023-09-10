import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import MoneyOffCsredRoundedIcon from '@mui/icons-material/MoneyOffCsredRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';

const API_URL = 'http://localhost:8080/api'

export interface SidebarListItemProps {
    text: string;
    icon: React.ComponentType;
    url: string;
}

export enum EPermision { READ = "READ", WRITE = "WRITE" }
export enum ObjectName { CUSTOMER_ORDER = "CUSTOMER_ORDER", SUPPLIER_ORDER = "SUPPLIER_ORDER", ANYLITICS = "ANYLITICS", INVENTORY = "INVENTORY", PROMO_CODE = "PROMO_CODE", CATEGORY = "CATEGORY", ALL = "ALL" }
export enum OrderStatus { IN_PROCESS, SENT, RETURNED, RECIVED, CANCELED }
export enum Role { ADMIN = "ADMIN", EMPLOYEE = "EMPLOYEE" }

export interface Employee {
    id: string
    name: string
    lastName: string
    usermame: string
    email: string
    password: string
    role: Role
    accessRights: AccessRight[]
    isDeleted: boolean
}

export interface AccessRight {
    id: string
    objectName: ObjectName
    permissions: Permission[]
}

export interface Permission {
    id: string
    type: EPermision
}



const NAV_ITEMS: SidebarListItemProps[] = [
    {
        icon: StorefrontRoundedIcon,
        url: '/Store',
        text: "Store"
    },
    {
        icon: QueryStatsRoundedIcon,
        url: '/Anylitics',
        text: "Sales Anylitics"
    },
    {
        icon: WarehouseRoundedIcon,
        url: '/Inventory',
        text: "Inventory"
    },
    {
        icon: ShoppingCartRoundedIcon,
        url: '/CustomerOrder',
        text: "Customer Orders"
    },
    {
        icon: LocalShippingRoundedIcon,
        url: '/SupplierOrder',
        text: "Supplier Orders"
    },
    {
        icon: MoneyOffCsredRoundedIcon,
        url: '/PromoCode',
        text: "Promo Codes"
    },
    {
        icon: AssignmentIndRoundedIcon,
        url: '/Employee',
        text: "Employees"
    },
    {
        icon: CategoryRoundedIcon,
        url: '/Category',
        text: "Categories"
    }
]

export { API_URL, NAV_ITEMS };
