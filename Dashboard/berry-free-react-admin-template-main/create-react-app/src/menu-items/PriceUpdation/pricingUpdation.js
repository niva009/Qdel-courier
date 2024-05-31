// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const PriceUpdation = {
  id: 'price change',
  title: 'Update Pricing',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'update price',
      type: 'item',
      url: '/price/priceUpdation',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default PriceUpdation;
