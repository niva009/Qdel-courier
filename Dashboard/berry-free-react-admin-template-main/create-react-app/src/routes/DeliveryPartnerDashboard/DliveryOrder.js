import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const UserList = Loadable(lazy(() => import('views/custmers/customerlist')));
const DeliveryDetails = Loadable(lazy(() => import('views/DeliveryDetails')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const DestinationMap = Loadable(lazy(() => import('views/DeliveryAdmin/Partneroperation/DestinationMap')));
const QrcodeReader = Loadable(lazy(() => import('views/QrcodeReader')));
const StatusUpdation = Loadable(lazy(() => import('views/statusUpdation')));
const OrderHistory = Loadable(lazy(() => import('views/DeliveryAdmin/Partneroperation/DeliveryHistory')));


// ==============================|| AUTHENTICATION ROUTING ||============================== //

const DeliveryOrder = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'customer/customerlist',
      element: <UserList />
    },
    {
      path: 'pages/register/register3',
      element: <AuthRegister3 />
    },
    {
      path: 'DestinationMap',
      element: <DestinationMap />
    },
    {
      path: 'QrcodeReader',
      element: <QrcodeReader />
    },
    {
      path: '/delivery/statusUpdation/:id',
      element: <StatusUpdation />
    },
    {
      path: 'delivery/deliveryPartnerInformation/:id',
      element: <DeliveryDetails />
    },
    {
      path: 'delivery/deliveryHistory',
      element: <OrderHistory />
    },
  
  ]
};

export default DeliveryOrder;
