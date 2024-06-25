import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const WarehouseRequest = Loadable(lazy(() => import('views/Warehouse/approvel')));
const TotalWarehouse = Loadable(lazy(() => import('views/Warehouse/totalWarehouse')));
const WarehouseDetails = Loadable(lazy(() => import('views/WarehouseInformation')));


// ==============================|| AUTHENTICATION ROUTING ||============================== //

const WarehouseAdminRoute = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/ware-house/approval',
      element: <WarehouseRequest />
    },
    {
      path: '/ware-house/totalWarehouse',
      element: <TotalWarehouse />
    },
    {
      path: 'warehouse/warehouse-information/:id',
      element: <WarehouseDetails />
    }
  ]
};

export default WarehouseAdminRoute;
