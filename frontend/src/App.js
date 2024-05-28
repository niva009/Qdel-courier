import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import HomeOne from "./pages/HomeOne";
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";
import HomeTwo from "./pages/HomeTwo";
import About from "./pages/About";
import Service from "./pages/Service";
import ServiceDetails from "./pages/ServiceDetails";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Pricing from "./pages/Pricing";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import RouteScrollToTop from "./elements/RouteScrollToTop";
import RateCalculator from "./pages/HomeThree";
import HomeFour from "./pages/HomeFour";
import HomeFive from "./pages/HomeFive";
import Login from "./components/Login";
import Register from "./components/Register"
import DeliveryRegister from "./components/Deliverypartner/DeliveryRegister"
import BusinessReg from "./components/BusinessPartner/BusinessPartner";
import ShipNow from "./components/ShipNow";
import Schedulepickup from "./components/Schedulepickup";
import AddressForm from "./components/MainForm/AddressForm";
import Boxform  from './components/MainForm/boxform'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import PaymentForm from "./components/MainForm/PaymentForm";
import Review from "./components/MainForm/Review";
import QrcodePdf from "./components/Pdf/qrcodePdf";
import InvoicePdf from "./components/Pdf/invoicepdf"
import Orderhistory from './components/Orderhistory'
import Example from './components/Example'
import OrderTracking from './components/OrderTracking'
import Test from './components/Test'
import BusinessCourier from './components/BusinessCourier/BusinessCourier'
import Price from './components/BusinessCourier/Price'
import Bill from './components/BusinessCourier/BillPage'






function App() {

  useEffect(() => {
    AOS.init({
      offset: 0,
      easing: "ease",
      once: true,
    });
    AOS.refresh();
  }, []);
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <Routes>
        <Route exact path='/' element={<HomeOne />} />
        <Route exact path='/home-2' element={<HomeTwo />} />
        <Route exact path='/rate-calculator' element={<RateCalculator />} />
        <Route exact path='/home-4' element={<HomeFour />} />
        <Route exact path='/home-5' element={<HomeFive />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/service' element={<Service />} />
        <Route exact path='/service-details' element={<ServiceDetails />} />
        <Route exact path='/blog' element={<Blog />} />
        <Route exact path='/blog-details' element={<BlogDetails />} />
        <Route exact path='/pricing' element={<Pricing />} />
        <Route exact path='/faq' element={<Faq />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path='/deliveryregister' element={< DeliveryRegister/>} />
        <Route exact path='/businessregister' element={< BusinessReg/>} />
        <Route exact path='/schedulepickup' element={< Schedulepickup/>} />
        <Route exact path='/shipnow' element={< ShipNow/>} />
        <Route exact path='/address' element={< AddressForm/>} />
        <Route exact path='/boxform' element={< Boxform/>} />
        <Route exact path='/payment' element={< PaymentForm/>} />
        <Route exact path='/pdfqrcode/:id' element={< QrcodePdf/>} />
        <Route exact path='/review' element={< Review/>} />
        <Route exact path='/invoicepdf/:id' element={<InvoicePdf />} />
        <Route exact path='/orderhistory' element={< Orderhistory/>} />
        <Route exact path='/example' element={< Example/>} />
        <Route exact path='/tracking/:id' element={< OrderTracking/>} />
        <Route exact path='/test' element={< Test/>} />
        <Route exact path="/business-courier" element={<BusinessCourier/>} />
        <Route exact path="/price" element={<Price/>} />
        <Route exact path="/billing" element={<Bill/>} />
      </Routes>
      <ScrollToTop smooth color='#FA43ss18' />  
    </BrowserRouter>
  );
}

export default App;
