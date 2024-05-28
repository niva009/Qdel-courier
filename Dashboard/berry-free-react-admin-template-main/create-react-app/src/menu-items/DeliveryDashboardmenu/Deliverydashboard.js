// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const Deliverydashboard = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'orders',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'customer',
          title: 'order Request',
          type: 'item',
          url: '/delivery/approval',
          target: true
        },
        {
          id: 'register3',
          title: 'My orders',
          type: 'item',
          url: '/delivery/myorder',
          target: true
        },
        {
          id: 'order history',
          title: 'Order History',
          type: 'item',
          url: '/departner/daproved',
          target: true
        },
      ]
    }
  ]
};

export default Deliverydashboard;
