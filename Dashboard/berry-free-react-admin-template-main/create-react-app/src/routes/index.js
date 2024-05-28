import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import DeliveryAdminRotes from './DelveryAdminRoutes';
import DeliveryOrder from './DeliveryPartnerDashboard/DliveryOrder';
import Warehouse from './Warehouse'

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthenticationRoutes, DeliveryAdminRotes, DeliveryOrder, Warehouse]);
}
