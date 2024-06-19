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
import { useState,useEffect } from "react";
import axios from "axios";
import NavbarOne from "../NavbarOne";
import { ToastContainer, toast } from 'react-toastify';

function DeliveryRegister() {

  const [locationInfo ,setLocationInfo] = useState({

    district:"",
    state:"",
});

  const [user, setUser] = useState({
    name: "",
    phone_number: "",
    email: "",
    address: "",
    license_number: "",
    password: "",
    zipcode:"",
    location: {
      type: 'Point',
      coordinates: []
    },
    license_image: null,
    aadhar_image: null,
    user_image: null,
  });

  const [error ,setError] = useState({
    phone_number:"",
    email:"",
    aadhar_image:"",
  });

  const handleChange = (e) => {
    if (e.target.files) {
      setUser({ ...user, [e.target.name]: e.target.files[0] });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
      validateField(e.target.name, e.target.value);
    }
  };

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
      case "license_number":
        const DrivingRegex = /^[0-9]{16}$/;
        errorMsg = DrivingRegex.test(value) ? "" : "Driving License Number Should be 16 digits";
        break;
      default:
        break;
    }
    setError({ ...error, [name]: errorMsg });
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

  const handleSubmit = (e) => {
    e.preventDefault();


    const formData =  new FormData();
    formData.append('name', user.name);
    formData.append('phone_number', user.phone_number);
    formData.append('email', user.email);
    formData.append('address', user.address);
    formData.append('password', user.password);
    formData.append('user_name', user.user_name);
    formData.append('zipcode',user.zipcode);
    formData.append( 'location',JSON.stringify(user.location))
    formData.append('state',user.state);
    formData.append('district',user.district);
    formData.append('license_number', user.license_number);
    formData.append('license_image',user.license_image );
    formData.append('aadhar_image', user.aadhar_image);
    formData.append('user_image', user.user_image);



    axios.post('http://localhost:3001/api/deliveryreg', formData)
    
      .then((response) => {
        console.log(response);
        toast.success("your Registration Completed successfully you will get an approval email from admin Thank You",{

        });
        setTimeout(() =>{
          window.location.reload();
        },3000);
      })
      .catch((error) => {
        console.log(error, "something went wrong");
        toast.error("Registration failed",error);
        setTimeout(() =>{
          window.location.reload();
        },2000);
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
            Sign up Delivery Partner
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
                  id="email_address"
                  label="email"
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
                  id="address"
                  label="Address"
                  name="address"
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
                  name="license_number"
                  label="Driving License Number"
                  type="string"
                  error={!!error.license_number}
                  helperText={error.license_number ? "Enter valid License Number.":""}
                  id="license number"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="state"
                  label="State"
                  id="state" 
                  value={user.state}
                  onChange={handleChange}
                >
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="district"
                  label="District"
                  value={user.district}
                  id="district"
                  onChange={handleChange}
                >
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_name"
                  label="user name"
                  type="name"
                  id="user_name"
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
             
              <Grid item xs={12}>
                <label>Upload  Driving License</label>
            <TextField
               type="file"
               name="license_image"
               onChange={handleChange}
               accept="image/png, image/jpg"
                />
                </Grid>
                <Grid item xs={12}>
                <label>Upload  Aadhar Image</label>
            <TextField
               type="file"
               name="aadhar_image"
               onChange={handleChange}
               accept="image/png, image/jpg"
                />
                </Grid>
                <Grid item xs={12}>
                <label>Upload  user Photo</label>
            <TextField
               type="file"
               name="user_image"
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
            {/* tost container  */}

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

            {/* toast container end */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
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

export default DeliveryRegister;
