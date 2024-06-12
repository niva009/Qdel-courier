import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';

const StateList = [
  "Kerala",
  "Tamil Nadu",
  "Karnataka" 
];

const Charges = () => {
  const [priceInfo, setPriceInfo] = useState({});
  const [selectedState, setSelectedState] = useState('');
  const defaultTheme = createTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPriceInfo({ ...priceInfo, [name]: value });
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/api/priceupdation/${selectedState}`, priceInfo)
      .then(updatedCharge => {
        console.log(updatedCharge.data);
        toast.success("State Price Changed Successfully",{

        });
        setTimeout(() =>{
          window.location.reload();
        },3000);   
      })
      .catch(error => {
        console.log('error updating price information', error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Charges
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  value={selectedState}
                  onChange={handleStateChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Select State' }}
                >
                  <MenuItem value="" disabled>
                    Select State
                  </MenuItem>
                  {StateList.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="basePricePerKm"
                  required
                  fullWidth
                  onChange={handleChange}
                  label="Price Per Km"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  label="Price Per Kg"
                  onChange={handleChange}
                  name="weightFactor"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  label="Price Per Volume"
                  name="volumeFactor"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="expressStandardMultiplier"
                  onChange={handleChange}
                  name="expressStandardMultiplier"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="expressPremiumMultiplier"
                  onChange={handleChange}
                  label="expressPremiumMultiplier"
                />
              </Grid>
              <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!selectedState} // Disable button if state is not selected
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Charges;
