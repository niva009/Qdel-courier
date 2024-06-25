import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import NavbarOne from "../NavbarOne";
import { ToastContainer, toast } from 'react-toastify';

function BusinessReg() {
  const [locationInfo, setLocationInfo] = useState({});
  const [user, setUser] = useState({
    name: "",
    phone_number: "",
    address: "",
    password: "",
    aadhar_number: "",
    email: "",
    aadhar_image: null,
    state: "",
    zipcode:"",
    district:"",
    location: {
      type: 'Point',
      coordinates: []
    },
    user_name: ""
  });

  const [error, setError] = useState({
    phone_number: "",
    aadhar_number: "",
    email: "",
  });

  const handleChange = (e) => {
    if (e.target.files) {
      setUser({ ...user, [e.target.name]: e.target.files[0] });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
      validateField(e.target.name, e.target.value);
    }
  };

  const apiKeys = 'AIzaSyA7iwZvlrBjdkqB51xMCP76foKkIeqG8co';

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (user.zipcode) {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${user.zipcode}&key=${apiKeys}`);
          const { lat, lng } = response.data.results[0].geometry.location;
          setUser(prevUser => ({
            ...prevUser,
            location: {
              type: 'Point',
              coordinates: [lng, lat]
            }
          }));
        } else {
          console.log("zipcode is undefined");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchLocation();
  }, [user.zipcode]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        if (user.zipcode) {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${apiKeys}&address=${user.zipcode}`);
          const addressData = response.data;
          const addressComponents = addressData.results[0].address_components;

          let district = '';
          let state = '';

          addressComponents.forEach((component) => {
            if (component.types.includes('locality') || component.types.includes('administrative_area_level_2') || component.types.includes('administrative_area_level_3')) {
              district = component.long_name;
            } else if (component.types.includes('administrative_area_level_1')) {
              state = component.long_name;
            }
          });
          if (district || state !== "") {
            setLocationInfo({
              district,
              state
            });
          } else {
            console.log("district or state is undefined");
          }
        }
      } catch (error) {
        console.log(error, 'address error');
      }
    };

    fetchAddress();
  }, [user.zipcode]);

  useEffect(() => {
    setUser(prevForm => ({
      ...prevForm,
      district: locationInfo.district,
      state: locationInfo.state
    }));
  }, [locationInfo]);

  const validateField = (name, value) => {
    let errorMsg = "";
    switch (name) {
      case "phone_number":
        const phoneRegex = /^[0-9]{10}$/;
        errorMsg = phoneRegex.test(value) ? "" : "Phone number must be 10 digits";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errorMsg = emailRegex.test(value) ? "" : "Invalid email address";
        break;
      case "aadhar_number":
        const aadharRegex = /^[0-9]{12}$/;
        errorMsg = aadharRegex.test(value) ? "" : "Enter Valid Aadhar Number"; 
        break;
      default:
        break;
    }
    setError({ ...error, [name]: errorMsg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('user_name', user.user_name);
    formData.append('phone_number', user.phone_number);
    formData.append('address', user.address);
    formData.append('password', user.password);
    formData.append('aadhar_number', user.aadhar_number);
    formData.append('email', user.email);
    formData.append('zipcode', user.zipcode);
    formData.append('district', user.district);
    formData.append('aadhar_image', user.aadhar_image);
    formData.append('location', JSON.stringify(user.location));
    formData.append('state', user.state);

    axios.post('http://localhost:3001/api/business/businessreg', formData)
      .then((response) => {
        console.log(response);
        toast.success("Your registration completed successfully. You will get an approval email from admin. Thank you!", {});
        // setTimeout = (() =>{
        //   window.location.reload();
        // },3000)
      })
      .catch((error) => {
        console.log(error, "something went wrong");
        toast.error("Registration failed", error);
        // setTimeout = (() =>{
        //   window.location.reload();
        // },3000)
      });
  };
  return (
    <ThemeProvider theme={createTheme()}>
      <NavbarOne />
      <Container style={{ marginTop: "100px" }} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "orange" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up as BusinessPartner
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone_number"
                  label="Phone Number"
                  name="phone_number"
                  error={!!error.phone_number}
                  helperText={error.phone_number ? "Enter correct phone number." :""}
                  autoComplete="phone number"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  error={!!error.email}
                  helperText={error.email ? "Enter valid email address.":""}
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="zipcode"
                  label="Pincode"
                  type="string"
                  id="pin-code"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="state"
                  label="State"
                  id="state" 
                  onChange={handleChange}
                  value={user.state}
                >
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required  
                  fullWidth
                  name="district"
                  label="District"
                  id="district"
                  value={user.district}
                  onChange={handleChange}
                >
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="aadhar_number"
                  label="Aadhar Card Number"
                  error={!!error.aadhar_number}
                  helperText={error.aadhar_number ? "Enter valid Aadhar Number.":""}
                  type="string"
                  id="aadhar-card"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="user_name"
                  label="User Name"
                  name="user_name"
                  autoComplete="username"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
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
              <Grid item xs={12}>
                <label>Upload Aadhar Card</label>
                <TextField
                  type="file"
                  name="aadhar_image"
                  onChange={handleChange}
                  accept="image/png, image/jpg"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name="agree" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default BusinessReg;
