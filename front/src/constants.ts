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

const NAV_ITEMS: SidebarListItemProps[] = [
    {
        icon: StorefrontRoundedIcon,
        url: '',
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
