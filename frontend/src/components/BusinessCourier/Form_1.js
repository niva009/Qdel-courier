import React from "react";
import TextField from "@mui/material/TextField";
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { useState , useEffect } from 'react';
import Button from '@mui/material/Button'; // Add this import
import NavbarOne from '../NavbarOne';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Buton from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ContactsIcon from '@mui/icons-material/Contacts';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'black',
      color: 'white',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  


const Form_1 = () =>{

    const [ token, setToken] = useState('') ;
      const[ error, setError] = useState({})
      const [userid,setUserId] = useState('')
      const[ address, setAddress] = useState({})
      const[ nickname, setNickname] =useState('');
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const [smShow, setSmShow] = useState(false);
      const [lgShow, setLgShow] = useState(false);
      const [ addressModal ,setAddressModal] = useState([]);


      console.log(token,"user token")
    
      const [ form, setForm] = useState({
        from_name:'',
        from_phone_number:'',
        from_address: '',
        from_state: '',
        from_district: '',
        from_city: '',
        from_zipcode: '',
        from_vat_id:'',
        from_eoriNumber:"",
        to_name: '',
        to_phone_number: '',
        to_address: '',
        to_state: '',
        to_district: '',
        to_city: '',
        to_zipcode: '',
        user_id: '',
        to_eoriNumber:"",
        to_vat_id:"",

      }) ;

      const stateDistrictsData = {
        "Andhra Pradesh": ['Srikakulam','Parvathipuram Manyam','Vizianagaram','Visakhapatnam','Alluri Sitharama Raju','Anakapalli','Kakinada'],
        "Kerala": ['kasargod','kannur','kozhiokode','wayanad','malapuram','ernakulam','palakkad','alapuzha','kollam','trivandrum','edukki','thrissur','Pathanamthitta','Kottayam'],
        "TamilNadu": ['Ariyalur','Chengalpattu','Chennai','Coimbatore','Cuddalore','Dharmapuri','Dindigul','Erode','Kallakurichi','Kancheepuram','Karur','Krishnagiri','Madurai','Mayiladuthurai','Nagapattinam','Kanniyakumari','Namakkal','Perambalur','Pudukottai','Ramanathapuram','Ranipet','Salem','Sivagangai','Tenkasi','Thanjavur','Theni','Thiruvallur','Thiruvarur','Thoothukudi','Trichirappalli','Thirunelveli','Tirupathur','Tiruppur','Tiruvannamalai','The Nilgiris','Vellore','Viluppuram','Virudhunagar'],
        "Karnataka": ['Bagalkot','Bangalore','Belgaum','Bellary','Bidar','Bijapur', 'Chamarajanagar','Chikkaballapur','Chikkamagaluru','Chitradurga','Dakshina Kannada','Davanagere','Dharwad','Gadag','Hassan','Haveri','Kalaburagi','Kodagu','Kolar','Koppal','Mandya','Mysuru','Raichur','Ramanagara','Shivamogga','Tumakuru','Udupi','Karwar','Vijayapura','Yadgir'],
      }
      const handleChange = (e) =>{
        const {name,value} = e.target
        setAddress({
         ...address,
         [name]:value
        });
        setForm({
          ...form,
          [name]:value
        })
       }
       const handleNicknameChange = (e) =>{
         setNickname(e.target.value);
       }

      const submitAddress = () =>{
        handleShow();
      }

      useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          const decode = jwtDecode(token);
          setUserId(decode.userId);
          setForm(prevForm => ({
            ...prevForm,
            user_id: decode.userId
          }))
    
          axios.get('http://localhost:3001/api/getdata/getdata')
            .then(response => {
              setAddressModal(response.data.data);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
              // Handle error if needed
            });
        }
      }, [])

      const handleSubmit = (e) =>{
        e.preventDefault()

     axios.post('http://localhost:3001/api/getAllData/business', form)
     .then(response =>{ console.log(response.data)})
     .catch(error =>{ console.log( error)})

      }

      console.log(form,"form data storage");
      const saveFormData = () =>{
        try{

        const AddressData = {
         to_name: address.to_name,
         to_phone_number: address.to_phone_number,
         to_address: address.to_address,
         to_state: address.to_state,
         to_zipcode: address.to_zipcode,
         to_city: address.to_city,
         to_district: address.to_district,
         nickname:nickname,
         user_id:userid,
         to_eoriNumber: address.to_eoriNumber,
         to_vat_id: address.to_vat_id,
                 } 
                 axios.post('http://localhost:3001/api/address/address-book',AddressData)
     
                 .then(response => {
                     console.log(response)
                     handleClose();
                 }).catch(error =>{
                     console.log(error)   
                 })
                 
             } catch( err) {
                 console.log(err, 'server error')
             }

      }
      const handleTableRowClick = (rowData) => {
        setAddress({
          ...address,
          to_name: rowData.to_name,
          to_phone_number: rowData.to_phone_number,
          to_address: rowData.to_address,
          to_state: rowData.to_state,
          to_district: rowData.to_district,
          to_city: rowData.to_city,
          to_zipcode: rowData.to_zipcode,
          to_vat_id: rowData.to_vat_id,
          to_eoriNumber: rowData.to_eoriNumber
        });
      };
      

    return(
        <div>

     {/*///////////////////////////////////// small modal start here ///////////////////////////////////////////*/}


      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ENTER NiCKNAME</Form.Label>
              <Form.Control
                type="text"
                placeholder="Jackie Chan"
                onChange={handleNicknameChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ background:'orange',padding:'10px 20px',borderRadius:'5px',color:'white'}} onClick={saveFormData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/*//////////////////////////// small modal end here ////////////////////////////////////////////////// */}

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Address Book
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>nickname</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">City</StyledTableCell>
            <StyledTableCell align="right">State</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {addressModal.map((item, index) => (
      <StyledTableRow key={index} onClick={() => handleTableRowClick(item)}>
        <StyledTableCell component="th" scope="row">
          {item.nickname}
        </StyledTableCell>
        <StyledTableCell align="right">{item.to_name}</StyledTableCell>
        <StyledTableCell align="right">{item.to_address}</StyledTableCell>
        <StyledTableCell align="right">{item.to_city}</StyledTableCell>
        <StyledTableCell align="right">{item.to_state}</StyledTableCell>
      </StyledTableRow>
    ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Modal.Body>
      </Modal>

    
            <form onSubmit={handleSubmit} style={{margin:'20px,30px'}}>
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
              placeholder="John"
              onChange={handleChange}
              autoComplete="from_name"
              required
            />
            <FormLabel htmlFor="last-name" required>
            phone Number
            </FormLabel>
            <OutlinedInput
              id="last-name"
              name="from_phone_number"
              type="last-name"
              onChange={handleChange}
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
              onChange={handleChange}
              type="address1"
              autoComplete="from_address"
              required
            />
            <FormLabel htmlFor="address2">Postal code</FormLabel>
            <OutlinedInput
              id="address2"
              onChange={handleChange}
              name="from_zipcode"
              type="zipcode1"
              placeholder="123456"
              autoComplete="zipcode"
            />
            <FormLabel htmlFor="city" required>
              City
            </FormLabel>
            <OutlinedInput
              id="city"
              onChange={handleChange}
              name="from_city"
              type="city"
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
    <FormLabel htmlFor="district" required>
      District
    </FormLabel>
    <TextField
      select
      required
      fullWidth
      name="from_district"
      id="district"
      onChange={handleChange}
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
<FormLabel htmlFor="vat-id" required>
              Vat/Tax ID
            </FormLabel>
            <OutlinedInput
              onChange={handleChange}
              name="from_vat_id"
              type="text"
              autoComplete="vat_id"
            />
            <FormLabel htmlFor="Eori number" >
              Eori Number
            </FormLabel>
            <OutlinedInput
              onChange={handleChange}
              name="from_eoriNumber"
              type="text"
              autoComplete="Eori-number"
            />
          </FormGrid>
        </div>
      </Grid>
      <Grid item xs={12} md={6}>        
        <div>
          <FormLabel style={{ fontSize: '33px' }}>To <button onClick={() => setLgShow(true)} style={{border:'none'}}><ContactsIcon style={{color:'orange',}}/></button> </FormLabel>
          <FormGrid>
            <FormLabel htmlFor="first-name" required>
              Name
            </FormLabel>
            <OutlinedInput
              name="to_name"
              onChange={handleChange}
              value={address.to_name}
              type="text"
              placeholder="joan"
              autoComplete="first name"
              required
            />
            <FormLabel htmlFor="last-name" required>
               Phone Number
            </FormLabel>
            <OutlinedInput
              onChange={handleChange}
              name="to_phone_number"
              value={address.to_phone_number}
              type="text"
              placeholder="+91 1234567891"
              autoComplete="phone_number"
              required
            />
            <FormLabel htmlFor="address1" required>
              Address
            </FormLabel>
            <OutlinedInput
              onChange={handleChange}
              name="to_address"
              value={address.to_address}
              type="text"
              autoComplete="address"
              required
            />
            <FormLabel htmlFor="address2">Postal Code</FormLabel>
            <OutlinedInput
              onChange={handleChange}
              name="to_zipcode"
              value={address.to_zipcode}
              type="text"
              placeholder="123456"
              autoComplete="shipping address-line2"
            />
            <FormLabel htmlFor="city" required>
              City
            </FormLabel>
            <OutlinedInput
              onChange={handleChange}
              name="to_city"
              type="city"
              value={address.to_city}
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
      value={address.to_state}
      name="to_state"
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
    <FormLabel htmlFor="district" required>
      District
    </FormLabel>
    <TextField
      select
      required
      fullWidth
      name="to_district"
      id="district"
      value={address.to_district}
      onChange={handleChange}
      SelectProps={{ native: true }}
    >
      {stateDistrictsData[address.to_state]?.map((district, index) => (
        <option key={index} value={district}>
          {district}
        </option>
      ))}
    </TextField>
  </Grid>
</Grid>
<FormLabel htmlFor="address1" required>
              Vat/Tax ID
            </FormLabel>
            <OutlinedInput
              name="to_vat_id"
              onChange={handleChange}
              value={address.to_vat_id}
              type="text"
              autoComplete="address"
              required
            />
            <FormLabel htmlFor="address1" required>
              EORI Number
            </FormLabel>
            <OutlinedInput
              onChange={handleChange}
              value={address.to_eoriNumber}
              name="to_eoriNumber"
              type="text"
              autoComplete="address"
              required
            />
            <Button onClick={submitAddress}>Save this address to address book</Button>
            <Button type="submit">Click me</Button>
          </FormGrid>
        </div>
      </Grid>
    </Grid>
              
    </form>
        </div>
    )   
}
export default Form_1;