import * as React from 'react';
import TextField from "@mui/material/TextField";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { useState , useEffect } from 'react';
import Button from '@mui/material/Button'; // Add this import
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'; // Add this import
import NavbarOne from '../NavbarOne';
import { jwtDecode } from "jwt-decode";


const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm(){

  const [ token, setToken] = useState('') ;
      const[ error, setError] = useState({})
      const [ form, setForm] = useState({
        from_name:'',
        from_phone_number:'',
        from_address: '',
        from_state: '',
        from_district: '',
        from_city: '',
        from_zipcode: '',
        to_name: '',
        to_phone_number: '',
        to_address: '',
        to_state: '',
        to_district: '',
        to_city: '',
        to_zipcode: '',
        user_id: '',
      }) ;

  const stateDistrictsData = {
    "Andhra Pradesh": ['Srikakulam','Parvathipuram Manyam','Vizianagaram','Visakhapatnam','Alluri Sitharama Raju','Anakapalli','Kakinada'],
    "Kerala": ['kasargod','kannur','kozhiokode','wayanad','malapuram','ernakulam','palakkad','alapuzha','kollam','trivandrum','edukki','thrissur','Pathanamthitta','Kottayam'],
    "TamilNadu": ['Ariyalur','Chengalpattu','Chennai','Coimbatore','Cuddalore','Dharmapuri','Dindigul','Erode','Kallakurichi','Kancheepuram','Karur','Krishnagiri','Madurai','Mayiladuthurai','Nagapattinam','Kanniyakumari','Namakkal','Perambalur','Pudukottai','Ramanathapuram','Ranipet','Salem','Sivagangai','Tenkasi','Thanjavur','Theni','Thiruvallur','Thiruvarur','Thoothukudi','Trichirappalli','Thirunelveli','Tirupathur','Tiruppur','Tiruvannamalai','The Nilgiris','Vellore','Viluppuram','Virudhunagar'],
  }

     console.log("form data",form);


      const handlechange = (e) =>{
        const {name, value} =e.target;
        setForm({ ...form ,[name]:value });

      };
      const validateForm  = () =>{
        const NewError = {};
       if( form.from_name.trim() ===''){
       NewError.from_name = 'from name is require';
       }
       if( form.from_phone_number.trim() ===''){
        NewError.from_phone_number = 'from phone number is require'
       }

       setError(NewError);
       return Object.keys(NewError).length === 0;
      }
      const handleNext = () =>{
        const isValidate = validateForm();
        if (isValidate){
        console.log('form data',form)
        }
      };
      useEffect(() => {
        localStorage.setItem('courierForm_1', JSON.stringify(form));
      }, [form]); // Corrected dependency array
      
   
      useEffect(() => {
        if (token) {
          try {
            const decoded = jwtDecode(token);
            console.log(decoded.userId);
            // Update the form state with the user_id from the decoded token
            setForm(prevForm => ({...prevForm, user_id: decoded.userId}));
          } catch (error) {
            // Handle error if token is invalid
            console.error('Invalid token:', error);
          }
        }
      }, [token]);

    
    
      // Effect to retrieve token from localStorage on component mount
      useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      }, []);
    
;


  return (
    <form style={{margin:'20px,30px'}}>
      <NavbarOne/>
    <Grid container spacing={3} style={{ marginTop:'50px',padding:'80px 50px' ,paddingBottom:'50px'}}>
      <Grid item xs={12} md={6}>
        <div>
          <FormLabel style={{ fontSize: '33px' }}>From</FormLabel>
          <FormGrid>
            <FormLabel htmlFor="first-name" required>
               Name
            </FormLabel>
            <OutlinedInput
              id="first-name"
              name="from_name"
              type="name"
              value={form.from_name}
              placeholder="John"
              autoComplete="from_name"
              onChange={handlechange}
              required
            />
            <FormLabel htmlFor="last-name" required>
            phone Number
            </FormLabel>
            <OutlinedInput
              id="last-name"
              name="from_phone_number"
              value={form.from_phone_number}
              onChange={handlechange}
              type="last-name"
              placeholder="+91 12345"
              autoComplete="from_phone_number"
              required
            />
            <FormLabel htmlFor="address1" required>
              Address 
            </FormLabel>
            <OutlinedInput
              id="address1"
              name="from_address"
              value={ form.from_address}
              onChange={handlechange}
              type="address1"
              autoComplete="from_address"
              required
            />
            <FormLabel htmlFor="address2">Postal code</FormLabel>
            <OutlinedInput
              id="address2"
              name="from_zipcode"
              onChange={handlechange}
              type="zipcode1"
              placeholder="123456"
              autoComplete="zipcode"
            />
            <FormLabel htmlFor="city" required>
              City
            </FormLabel>
            <OutlinedInput
              id="city"
              name="from_city"
              type="city"
              value={form.from_city}
              onChange={handlechange}
              placeholder="chennai"
              autoComplete="City"
              required
            />
             <Grid container spacing={2}>
  <Grid item xs={6}>
    <FormLabel htmlFor="state" required>
      State
    </FormLabel>
    <TextField
      select
      required
      fullWidth
      name="from_state"
      id="state"
      onChange={handlechange}
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
    <FormLabel htmlFor="district" required>
      District
    </FormLabel>
    <TextField
      select
      required
      fullWidth
      name="district"
      id="district"
      onChange={handlechange}
      SelectProps={{ native: true }}
    >
      {stateDistrictsData[form.from_state]?.map((district, index) => (
        <option key={index} value={district}>
          {district}
        </option>
      ))}
    </TextField>
  </Grid>
</Grid>
  <FormControlLabel
              control={<Checkbox name="saveAddress" value="yes" />}
              label="Use this address for payment details"
            />
          </FormGrid>
        </div>
      </Grid>
      <Grid item xs={12} md={6}>        
        <div>
          <FormLabel style={{ fontSize: '33px' }}>To</FormLabel>
          <FormGrid>
            <FormLabel htmlFor="first-name" required>
              Name
            </FormLabel>
            <OutlinedInput
              name="to_name"
              type="text"
              onChange={handlechange}
              placeholder="joan"
              autoComplete="first name"
              required
            />
            <FormLabel htmlFor="last-name" required>
               Phone Number
            </FormLabel>
            <OutlinedInput
              name="to_phone_number"
              type="text"
              onChange={handlechange}
              placeholder="+91 1234567891"
              autoComplete="phone_number"
              required
            />
            <FormLabel htmlFor="address1" required>
              Address
            </FormLabel>
            <OutlinedInput
              name="to_address"
              type="text"
              autoComplete="address"
              onChange={handlechange}
              required
            />
            <FormLabel htmlFor="address2">Postal Code</FormLabel>
            <OutlinedInput
              name="to_zipcode"
              type="text"
              onChange={handlechange}
              placeholder="123456"
              autoComplete="shipping address-line2"
            />
            <FormLabel htmlFor="city" required>
              City
            </FormLabel>
            <OutlinedInput
              name="to_city"
              onChange={handlechange}
              type="city"
              placeholder="bangalore"
              autoComplete="City"
              required
            />
         <Grid container spacing={2}>
  <Grid item xs={6}>
    <FormLabel htmlFor="state" required>
      State
    </FormLabel>
    <TextField
      select
      required
      fullWidth
      name="to_state"
      id="state"
      onChange={handlechange}
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
    <FormLabel htmlFor="district" required>
      District
    </FormLabel>
    <TextField
      select
      required
      fullWidth
      name="to_district"
      id="district"
      onChange={handlechange}
      SelectProps={{ native: true }}
    >
      {stateDistrictsData[form.to_state]?.map((district, index) => (
        <option key={index} value={district}>
          {district}
        </option>
      ))}
    </TextField>
  </Grid>
</Grid>

            <FormControlLabel
              control={<Checkbox name="saveAddress" value="yes" />}
              label="Use this address for payment details"
            />
          </FormGrid>
        </div>
      </Grid>
    </Grid>
                 {/* <Button style={{width:'100%', marginBottom:'40px'}}
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    type='button'
                    onClick={handleNext}
                    sx={{
                      width: { xs: '100%', sm: 'fit-content' },
                    }}
>save
                  </Button> */}
    </form>
  );
}
