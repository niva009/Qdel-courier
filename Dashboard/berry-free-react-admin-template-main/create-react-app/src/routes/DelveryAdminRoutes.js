import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const DeliveryPartnerlist = Loadable(lazy(() => import('views/DeliveryPartner/Deliverypartnerlist')));
const Daprovel = Loadable(lazy(() => import('views/DeliveryPartner/Dparneraproved')));
const DorderTaking = Loadable(lazy(() => import('views/DeliveryAdmin/Partneroperation/Daprovel')));
const Myorder = Loadable(lazy(() => import('views/DeliveryAdmin/Partneroperation/Myorder')));
const Map = Loadable(lazy(() => import('views/DeliveryAdmin/Partneroperation/Map')));



// ==============================|| AUTHENTICATION ROUTING ||============================== //

const DeliveryAdminRotes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/departner/daprovelist',
      element: < DeliveryPartnerlist/>
    },
    {
      path: '/departner/daproved',
      element: <Daprovel />
    },
    {
      path: '/delivery/approval',///////delivery url for DELIVERY ADMIN////////////////////////////
      element: <DorderTaking />
    },
    {
      path: '/delivery/myorder',///////delivery url for DELIVERY ADMIN////////////////////////////
      element: <Myorder />
    },
    {
      path: '/map/:id',////////////////Show Map ////////////////////////////////////////
      element: <Map />
    },
  
   
  ]
};

export default DeliveryAdminRotes;
