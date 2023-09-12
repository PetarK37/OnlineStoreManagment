import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import MoneyOffCsredRoundedIcon from '@mui/icons-material/MoneyOffCsredRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
import { useMediaQuery } from '@mui/material';
import SignIn from './Components/SignIn/SignInPage'
import PageAndNavLayout from './Components/Layouts/PageAndNavLayout';
import EmployeePage from './Components/Employees/EmployeePage';
import NotFound from './Components/NotFound/NotFound';

const API_URL = 'http://localhost:8080/api'
const isSmallerScreenSetting = '(max-width:600px)';


export interface SidebarListItemProps {
    text: string;
    icon: React.ComponentType;
    url: string;
}

export interface SidebarListItems {
    text: string;
    icon: React.ComponentType;
    url: string;
    requiredRole: Role;
    requiredObjectName: ObjectName | null;
    requiredPermission: EPermision | null;
}

export enum EPermision { READ = "READ", WRITE = "WRITE" }
export enum ObjectName { CUSTOMER_ORDER = "CUSTOMER_ORDER", SUPPLIER_ORDER = "SUPPLIER_ORDER", ANYLITICS = "ANYLITICS", INVENTORY = "INVENTORY", PROMO_CODE = "PROMO_CODE", CATEGORY = "CATEGORY", ALL = "ALL" }
export enum OrderStatus { IN_PROCESS, SENT, RETURNED, RECIVED, CANCELED }
export enum Role { ADMIN = "ADMIN", EMPLOYEE = "EMPLOYEE" }

export interface Employee {
    id?: string | null
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
    id?: string
    objectName: ObjectName
    permissions: Permission[]
}

export interface Permission {
    id?: string
    type: EPermision
}

export interface EmployeeReqDTO {
    name: string
    lastName: string
    accessRights: AccessRight[]
    password: string | null
}

const NAV_ITEMS: SidebarListItems[] = [
    {
        icon: StorefrontRoundedIcon,
        url: '/Store',
        text: "Store",
        requiredObjectName: null,
        requiredPermission: null,
        requiredRole: Role.ADMIN,
    },
    {
        icon: QueryStatsRoundedIcon,
        url: '/Anylitics',
        text: "Sales Anylitics",
        requiredObjectName: ObjectName.ANYLITICS,
        requiredPermission: EPermision.READ,
        requiredRole: Role.EMPLOYEE,
    },
    {
        icon: WarehouseRoundedIcon,
        url: '/Inventory',
        text: "Inventory",
        requiredObjectName: ObjectName.INVENTORY,
        requiredPermission: EPermision.READ,
        requiredRole: Role.EMPLOYEE,
    },
    {
        icon: ShoppingCartRoundedIcon,
        url: '/CustomerOrder',
        text: "Customer Orders",
        requiredObjectName: ObjectName.CUSTOMER_ORDER,
        requiredPermission: EPermision.READ,
        requiredRole: Role.EMPLOYEE,
    },
    {
        icon: LocalShippingRoundedIcon,
        url: '/SupplierOrder',
        text: "Supplier Orders",
        requiredObjectName: ObjectName.SUPPLIER_ORDER,
        requiredPermission: EPermision.READ,
        requiredRole: Role.EMPLOYEE,
    },
    {
        icon: MoneyOffCsredRoundedIcon,
        url: '/PromoCode',
        text: "Promo Codes",
        requiredObjectName: ObjectName.PROMO_CODE,
        requiredPermission: EPermision.READ,
        requiredRole: Role.EMPLOYEE,
    },
    {
        icon: AssignmentIndRoundedIcon,
        url: '/Employee',
        text: "Employees",
        requiredObjectName: null,
        requiredPermission: null,
        requiredRole: Role.ADMIN,
    },
    {
        icon: CategoryRoundedIcon,
        url: '/Category',
        text: "Categories",
        requiredObjectName: ObjectName.CATEGORY,
        requiredPermission: EPermision.READ,
        requiredRole: Role.EMPLOYEE,
    }
]

export { API_URL, NAV_ITEMS, isSmallerScreenSetting };
