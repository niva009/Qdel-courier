import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const UserList = Loadable(lazy(() => import('views/custmers/customerlist')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const DeliveryOrder = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/customer/customerlist',
      element: < UserList/>
    },
    {
      path: '/pages/register/register3',
      element: <AuthRegister3 />
    }
  ]
};

export default DeliveryOrder;