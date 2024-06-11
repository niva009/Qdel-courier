import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const UserList = Loadable(lazy(() => import('views/custmers/customerlist')));
const Login = Loadable(lazy(() => import('views/Login/Login')));
const TotalInvoice = Loadable(lazy(() => import('views/dashboard/Totalinvoice')));


// ==============================|| AUTHENTICATION ROUTING ||============================== //
//===============================//  CONTAING PAYMENT INFO FOR // =========================//

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/customer/customerlist',
      element: < UserList/>
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/totalInvoice',
      element:<TotalInvoice/>
    }
  ]
};

export default AuthenticationRoutes;
