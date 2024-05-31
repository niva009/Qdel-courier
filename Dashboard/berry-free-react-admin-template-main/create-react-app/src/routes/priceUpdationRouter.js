import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const Updateprice = Loadable(lazy(() => import('views/Charges')));




// ==============================|| AUTHENTICATION ROUTING ||============================== //

const PriceUpdationRouter = {
  path: '/price',
  element: <MinimalLayout />,
  children: [
    {
      path: '/price/priceupdation',
      element: <Updateprice/>
    },
   
  ]
};

export default PriceUpdationRouter;
