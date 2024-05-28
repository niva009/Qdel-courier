// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const DeliveryMenu = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Delivery Partner',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'customer',
          title: 'delivery partner request',
          type: 'item',
          url: '/departner/daprovelist',
          target: true
        },
        {
          id: 'register3',
          title: 'Approved Delivery Partner',
          type: 'item',
          url: '/departner/daproved',
          target: true
        }
      ]
    }
  ]
};

export default DeliveryMenu;
