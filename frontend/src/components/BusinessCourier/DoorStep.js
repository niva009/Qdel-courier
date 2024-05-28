import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Datepicker.module.css"; // Import the CSS module
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const DoorStep = () => {
  const [selectDate, setSelectedDate] = useState(new Date());
  const [smsCharge, setSmsCharge] = useState(false);
  const [extraSecurity, setExtraSecurity] = useState(false);

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  const handleOptionChange = (e) => {
    const { name, checked } = e.target;
    if (name === "smsCharge") {
      setSmsCharge(checked);
    } else if (name === "extraSecurity") {
      setExtraSecurity(checked);
    }
  };

  const handleSubmit = async () => {
    const data = {
      selectDate,
      pickupCharge: 100,
      smsCharge: smsCharge ? 50 : 0,
      extraSecurityCharge: extraSecurity ? 150 : 0,
    };

    try {
      const response = await fetch('/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Data saved successfully:', result);
      // Handle success (e.g., show a success message or navigate to another page)
    } catch (error) {
      console.error('Error saving data:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <h5 className={styles.title}>Select pickup Date:</h5>
        <DatePicker
          selected={selectDate}
          onChange={handleChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="d/MM/yyyy h:mm aa"
          timeCaption="Time"
          className={styles.datePickerInput}
          calendarClassName={styles.datePickerCalendar}
          minDate={new Date()} // Disable past dates
        />
        <FormGroup style={{ paddingTop: '35px' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <FormControlLabel
              control={<Checkbox defaultChecked disabled />}
              label="Pickup Charge"
            />
            <Typography>100 Rs</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <FormControlLabel
              required
              control={<Checkbox name="smsCharge" checked={smsCharge} onChange={handleOptionChange} />}
              label="Sms Charge"
            />
            <Typography>50 Rs</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <FormControlLabel
              required
              control={<Checkbox name="extraSecurity" checked={extraSecurity} onChange={handleOptionChange} />}
              label="Extra Security Charge"
            />
            <Typography>150 Rs</Typography>
          </Box>
        </FormGroup>
      </div>
      <button 
        style={{ margin: "20px 0px", padding: '10px 60px', border: 'none', background: 'orange', color: 'white' }} 
        onClick={handleSubmit}
      >
        Next
      </button>
    </div>
  );
};

export default DoorStep;
