// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Customer Details',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'customer',
          title: 'Customer information',
          type: 'item',
          url: '/customer/customerlist',
          target: true
        },
        {
          id: 'register3',
          title: 'Register',
          type: 'item',
          url: '/pages/register/register3',
          target: true
        }
      ]
    }
  ]
};

export default pages;
