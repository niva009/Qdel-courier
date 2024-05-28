import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddressForm from './MainForm/AddressForm';
import ServiceForm from './MainForm/boxform';
import PaymentForm from './MainForm/PaymentForm';
import ReviewForm from './MainForm/Review';
import { useNavigate, useLocation } from 'react-router-dom';

function ShipNow() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if token is not present
    } else {
      // If the previous location was the invoice page, set the selectedIndex to 3 (index of ReviewForm)
      if (location.pathname === "/invoicepdf/:id") {
        setSelectedIndex(3);
      }
    }
  }, [navigate, location.pathname]);

  const handleNext = () => {
    setSelectedIndex(prevIndex => prevIndex + 1);
  };

  const handlePrev = () => {
    setSelectedIndex(prevIndex => prevIndex - 1);
  };

  return (
    <>
      {selectedIndex === 0 && <AddressForm />}
      {selectedIndex === 1 && <ServiceForm />}
      {selectedIndex === 2 && <PaymentForm />}
      {selectedIndex === 3 && <ReviewForm />}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button variant="outlined" onClick={handlePrev} disabled={selectedIndex === 0}>
          Previous
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={selectedIndex === 3}>
          Next
        </Button>
      </div>
    </>
  );
}

export default ShipNow;