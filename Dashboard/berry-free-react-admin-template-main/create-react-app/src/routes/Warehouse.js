import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const WarehouseRequest = Loadable(lazy(() => import('views/Warehouse/approvel')));




// ==============================|| AUTHENTICATION ROUTING ||============================== //

const WarehouseAdminRoute = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/ware-house/approval',
      element: < WarehouseRequest/>
    },
  ]
};

export default WarehouseAdminRoute;
