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
  const [user, setUser] = useState({
    name: "",
    phone_number: "",
    address: "",
    password: "",
    aadhar_number: "",
    email: "",
    aadhar_image: null,
    state: "",
    district:"",
    lat:"",
    long:"",
  });
  
  const [error, setError] = useState({
    phone_number: "",
    aadhar_number: "",
    email: "",
  });

  const stateDistrictsData = {
    "Andhra Pradesh": ['Srikakulam','Parvathipuram Manyam','Vizianagaram','Visakhapatnam','Alluri Sitharama Raju','Anakapalli','Kakinada'],
    "Kerala": ['kasargod','kannur','kozhiokode','wayanad','malapuram','ernakulam','palakkad','alapuzha','kollam','trivandrum','edukki','thrissur','Pathanamthitta','Kottayam'],
    "TamilNadu": ['Ariyalur','Chengalpattu','Chennai','Coimbatore','Cuddalore','Dharmapuri','Dindigul','Erode','Kallakurichi','Kancheepuram','Karur','Krishnagiri','Madurai','Mayiladuthurai','Nagapattinam','Kanniyakumari','Namakkal','Perambalur','Pudukottai','Ramanathapuram','Ranipet','Salem','Sivagangai','Tenkasi','Thanjavur','Theni','Thiruvallur','Thiruvarur','Thoothukudi','Trichirappalli','Thirunelveli','Tirupathur','Tiruppur','Tiruvannamalai','The Nilgiris','Vellore','Viluppuram','Virudhunagar'],
  };

  const handleChange = (e) => {
    if (e.target.files) {
      setUser({ ...user, [e.target.name]: e.target.files[0] });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
      validateField(e.target.name, e.target.value);
    }
  };

  const apiKey = "AIzaSyA7iwZvlrBjdkqB51xMCP76foKkIeqG8co";

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (user.zipcode) {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${user.zipcode}&key=${apiKey}`);
          const { lat, lng } = response.data.results[0].geometry.location;
          setUser(prevUser => ({
            ...prevUser,
            lat: lat,
            long: lng
          }));
        } else {
          console.log("zipcode is undefined");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchLocation();
  }, [user.zipcode, apiKey]);

  const validateField  = (name, value) => {
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
        const AaadharRegex = /^[0-9]{16}$/;
        errorMsg = AaadharRegex.test(value) ? "" : "Enter Valid Aadhar Number"; 
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
    formData.append('lat', user.lat);
    formData.append('long', user.long);

    axios.post('http://localhost:3001/api/business/businessreg', formData)
      .then((response) => {
        console.log(response);
        toast.success("Your registration completed successfully. You will get an approval email from admin. Thank you!", {});
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.log(error, "something went wrong");
        toast.error("Registration failed", error);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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
            encType="multPart/formData"
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
                  autoComplete="phone email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="zipcode"
                  label=" Pincode"
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
                  select
                  required
                  fullWidth
                  name="state"
                  label="State"
                  id="state" 
                  onChange={handleChange}
                  SelectProps={{ native: true }}
                >

                  {Object.keys(stateDistrictsData).map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  required  
                  fullWidth
                  name="district"
                  label="District"
                  id="district"
                  onChange={handleChange}
                  SelectProps={{ native: true }}
                >
                  {stateDistrictsData[user.state]?.map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </TextField>
              </Grid>
    
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="aadhar_number"
                  label="aadhar Card Number "
                  error={!!error.aadhar_number}
                  helperText={error.aadhar_number ? "Enter valid License Number.":""}
                  type="string"
                  id="aadhar -card"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="user_name"
                  label="user Name"
                  name="user_name"
                  autoComplete="phone email"
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
                <label>Upload  aadhar card</label>
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
