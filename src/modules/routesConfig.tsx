import {RiCustomerService2Line} from 'react-icons/ri';
import {BsCurrencyBitcoin} from 'react-icons/bs';
import {ReactNode} from 'react';
import {RoutePermittedRole} from '../shared/constants/AppConst';

export interface RouterConfigData {
  id: string;
  title: string;
  messageId: string;
  icon?: string | ReactNode;
  type: 'item' | 'group' | 'collapse' | 'divider';
  children?: RouterConfigData[];
  permittedRole?: RoutePermittedRole;
  color?: string;
  url?: string;
  exact?: boolean;
  count?: number;
  as?: string;
}

const routesConfig: RouterConfigData[] = [
  {
    id: 'cart-management',
    title: 'Quản lý giỏ hàng',
    messageId: 'Quản lý giỏ hàng',
    type: 'group',
    children: [
      {
        id: 'cart',
        title: 'Giỏ hàng',
        messageId: 'Giỏ hàng',
        type: 'item',
        icon: <BsCurrencyBitcoin />,
        url: '/cart-management/cart',
      },
      {
        id: 'inventory-table',
        title: 'Bảng hàng',
        messageId: 'Bảng hàng',
        type: 'item',
        icon: <RiCustomerService2Line />,
        url: '/cart-management/inventory-table',
      },
    ],
  },
  {
    id: 'configuration-management',
    title: 'Quản lý cấu hình',
    messageId: 'Quản lý cấu hình',
    type: 'group',
    children: [
      {
        id: 'form-cart',
        title: 'Biểu mẫu bảng hàng',
        messageId: 'Biểu mẫu bảng hàng',
        type: 'item',
        icon: <BsCurrencyBitcoin />,
        url: '/config-management/form-cart',
      },
      {
        id: 'property',
        title: 'Thuộc tính BĐS',
        messageId: 'Thuộc tính BĐS',
        type: 'item',
        icon: <RiCustomerService2Line />,
        url: '/config-management/property',
      },
      {
        id: 'file-image',
        title: 'Quản lý hình ảnh',
        messageId: 'Quản lý hình ảnh',
        type: 'item',
        icon: <RiCustomerService2Line />,
        url: '/config-management/file-image',
      },
    ],
  },
];
export default routesConfig;
