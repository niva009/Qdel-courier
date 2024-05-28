import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import DeliveryMenu from './deliverymenu';
import Deliverydashboard from './DeliveryDashboardmenu/Deliverydashboard';
import Warehouse from './Warehouse/index';

// ==============================|| MENU ITEMS ||============================== //

const userRole = localStorage.getItem('userRole');

// Check if userRole exists and log it
if (userRole !== null) {
  console.log('userRole:', userRole);
} else {
  console.log('userRole not found in localStorage');
}

let menuItems;

if (userRole === '3') {
  menuItems = {
    items: [Deliverydashboard]
  };
} else {
  menuItems = {
    items: [dashboard, pages, Deliverydashboard, DeliveryMenu, Warehouse, utilities]
  };
}

export default menuItems;
