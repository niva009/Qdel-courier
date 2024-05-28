// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const Warehouse = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Ware house',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'ware-house',
          title: 'Ware house request',
          type: 'item',
          url: '/ware-house/approval',
          target: true
        },
        {
          id: 'wareho-approved',
          title: 'Total Warehouse',
          type: 'item',
          url: '/delivery/myorder',
          target: true
        },
      ]
    }
  ]
};

export default Warehouse;
