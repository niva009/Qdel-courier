// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Total Invoices',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Total Invoices',
      type: 'item',
      url: '/totalInvoice',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
