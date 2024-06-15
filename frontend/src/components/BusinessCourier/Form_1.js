import React from "react";
import TextField from "@mui/material/TextField";
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { useState , useEffect, startTransition} from 'react';
import Button from '@mui/material/Button'; // Add this import
import NavbarOne from '../NavbarOne';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
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
import { useNavigate} from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';


const UploadModal = ({
  show,
  onHide,
  handleUpload,
  handleCardTypeChange, // Add handleCardTypeChange prop here
  handleFileChange1,
  handleFileChange2,
  handleDrop1,
  handleDrop2,
  handleDragOver,
  file1,
  file2,
  cardType
}) => {

  const activeStyle = {
    backgroundColor: 'orange',
    color: 'white'
  };

  const inactiveStyle = {
    backgroundColor: 'white',
    color: 'black'
  };
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Upload {cardType === 'aadhar' ? 'Aadhar' : 'ID'} Card Image Here
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>We don't save and share your {cardType} card image and data.</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <ToggleButtonGroup
            value={cardType}
            exclusive
            onChange={handleCardTypeChange}
            aria-label="card type"
          >
            <ToggleButton
              value="aadhar"
              aria-label="aadhar card"
              style={cardType === 'aadhar' ? activeStyle : inactiveStyle}
            >
              Aadhar Card
            </ToggleButton>
            <ToggleButton
              value="id"
              aria-label="id card"
              style={cardType === 'id' ? activeStyle : inactiveStyle}
            >
              ID Card
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div
            style={{
              width: '45%',
              height: '200px',
              border: '2px dashed #ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
            onDrop={handleDrop1}
            onDragOver={handleDragOver}
          >
            {file1 ? <p>{file1.name}</p> : <p>Drag & Drop front side of the {cardType} Image</p>}
            <input type="file" onChange={handleFileChange1} style={{ display: 'none' }} id="fileInput1" />
            <label htmlFor="fileInput1" style={{ cursor: 'pointer' }}>or choose file</label>
          </div>
          <div
            style={{
              width: '45%',
              height: '200px',
              border: '2px dashed #ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
            onDrop={handleDrop2}
            onDragOver={handleDragOver}
          >
            {file2 ? <p>{file2.name}</p> : <p>Drag & Drop back side of the {cardType} Image</p>}
            <input type="file" onChange={handleFileChange2} style={{ display: 'none' }} id="fileInput2" />
            <label htmlFor="fileInput2" style={{ cursor: 'pointer' }}>or choose file</label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ padding: '10px 20px', color: 'white', backgroundColor: 'orange', border: 'none' }} onClick={handleUpload}>Upload</Button>
      </Modal.Footer>
    </Modal>
  );
};



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

  const navigate = useNavigate();

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
      const [modalShow, setModalShow] = useState(false);
      const [file1, setFile1] = useState(null);
      const [file2, setFile2] = useState(null);
      const [dataFromCard,setDataFromCard] = useState({ name: '', address:'', zipcode:''});
      const [fromLocationInfo,setFromLocationInfo] = useState('');
      const [toLocationInfo, setToLocationInfo] = useState('')
      const [cardType, setCardType] = useState('aadhar');


      ////////////////////this  code user data from aadhar and fill the form ///////////////////

      
  const handleFileChange1 = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleFileChange2 = (e) => {
    setFile2(e.target.files[0]);
  };

  const handleDrop1 = (e) => {
    e.preventDefault();
    setFile1(e.dataTransfer.files[0]);
  };

  const handleDrop2 = (e) => {
    e.preventDefault();
    setFile2(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleCardTypeChange = (event, newCardType) => {
    if (newCardType !== null) {
      setCardType(newCardType);
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    if (file1) formData.append('uploadedImages', file1);
    if (file2) formData.append('uploadedImages', file2);
  
    const endpoint = cardType === 'aadhar'
      ? 'http://localhost:3001/api/image-processing'
      : 'http://localhost:3001/api/idcard-processing';
  
    axios.post(endpoint, formData)
      .then(response => {
        console.log(response, "response from id card");
        const { name, address, zipcode } = response.data.data;
        setDataFromCard({ name, address, zipcode });
        alert(`Name: ${response.data.data.name} Address: ${response.data.data.address}\nzipcode: ${response.data.data.zipcode}`);
      })
      .catch(error => {
        console.error('There was an error uploading the files!', error.message);
      })
      .finally(() => {
        setModalShow(false);
      });
  };
  

  console.log(dataFromCard,"data are here");



/////////////////////update form state when DataFromCard are change //////////////////////////
useEffect(() => {
  setForm(prevForm => ({
    ...prevForm,
    from_name: dataFromCard.name,
    from_address: dataFromCard.address,
    from_zipcode: dataFromCard.zipcode,
  }));
}, [dataFromCard]);




      //////////////////// this code end here///////////////////////////////
    
      const [ form, setForm] = useState({
        from_name:'',
        from_phone_number:'',
        from_address: '',
        from_state: '',
        from_district: '',
        from_zipcode: '',
        from_vat_id:'',
        to_name: '',
        to_phone_number: '',
        to_address: '',
        to_state: '',
        to_district: '',
        to_zipcode: '',
        user_id: '',
        to_vat_id:"",

      }) ;

      const handleChange = (e) =>{
        const {name,value} = e.target
        setAddress({
         ...address,
         [name]:value
        });
        setForm(prevForm => ({
          ...prevForm,
          [name]: value
        }));




        if (name === 'from_name' || name === 'from_address' || name === 'from_zipcode') {
          setDataFromCard(prevData => ({
            ...prevData,
            [name.replace('from_', '')]: value
          }));
        }
       }
       const handleNicknameChange = (e) =>{
         setNickname(e.target.value);
       }

      const submitAddress = () =>{
        handleShow();
      }

      
      useEffect(() =>{
        setForm(prevForm => ({
          ...prevForm,
          from_district:fromLocationInfo.from_district,
          from_state:fromLocationInfo.from_state,
        }))
        setForm(prevForm =>({
          ...prevForm,
          to_district:toLocationInfo.to_district,
          to_state:toLocationInfo.to_state,
        }))
      },[fromLocationInfo,toLocationInfo]);

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

      const ApiKey = 'AIzaSyA7iwZvlrBjdkqB51xMCP76foKkIeqG8co';
useEffect(() => {
  const FetchAddress = async () => {
    try {
      if (form && form.from_zipcode) {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${ApiKey}&address=${form.from_zipcode}`);
        const addressData = response.data;
        const addressComponents = addressData.results[0].address_components;

        let from_district = '';
        let from_state = '';

        addressComponents.forEach((component) => {
          if (component.types.includes('locality') || component.types.includes('administrative_area_level_2') || component.types.includes('administrative_area_level_3')) {
            from_district = component.long_name;
          } else if (component.types.includes('administrative_area_level_1')) {
            from_state = component.long_name;
          }
        });

        setFromLocationInfo({
          from_district,
          from_state,
          // You can also extract other information like latitude, longitude, etc.
          // latitude: addressData.results[0].geometry.location.lat,
          // longitude: addressData.results[0].geometry.location.lng,
        });
      }
    } catch (error) {
      console.log(error, 'address error');
    }
  };
  FetchAddress();
}, [form.from_zipcode]);


useEffect(() => {
  const FetchAddress = async () => {
    try {

      if( form && form.to_zipcode){

        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${ApiKey}&address=${form.to_zipcode}`);
        const addressData = response.data;
        const addressComponents = addressData.results[0].address_components;

        let to_district = '';
        let to_state = '';

        addressComponents.forEach((component) => {
          if (component.types.includes('locality') || component.types.includes('administrative_area_level_2') || component.types.includes('administrative_area_level_3')) {
            to_district = component.long_name;
          } else if (component.types.includes('administrative_area_level_1')) {
            to_state = component.long_name;
          }
        });

        setToLocationInfo({
          to_district,
          to_state,
          // You can also extract other information like latitude, longitude, etc.
          // latitude: addressData.results[0].geometry.location.lat,
          // longitude: addressData.results[0].geometry.location.lng,
        });
      }
    } catch (error) {
      console.log(error, 'address error');
    }
  };
  FetchAddress();
}, [form.to_zipcode]);

console.log(toLocationInfo,"to state");

      const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post('http://localhost:3001/api/getAllData/business', form)
          .then(response => {
            console.log(response.data);
            // Navigate to the shipment detail page inside the then block
            startTransition(() => {
              navigate('/shipmentdetail');
            });
          })
          .catch(error => {
            console.log(error);
            setError(error);
          });
      };

      console.log(form,"form data storage");
      const saveFormData = () =>{
        try{

        const AddressData = {
         to_name: address.to_name,
         to_phone_number: address.to_phone_number,
         to_address: address.to_address,
         to_state: address.to_state,
         to_zipcode: address.to_zipcode,
         to_district: address.to_district,
         nickname:nickname,
         user_id:userid,
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
          to_zipcode: rowData.to_zipcode,
          to_vat_id: rowData.to_vat_id,
        });
      };

      useEffect(() =>{
        setAddress(prevForm =>({
          ...prevForm,
          to_district:toLocationInfo.to_district,
          to_state:toLocationInfo.to_state,
        }))
      },[toLocationInfo]);
    

    return(
        <div>


<UploadModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleUpload={handleUpload}
        handleFileChange1={handleFileChange1}
        handleFileChange2={handleFileChange2}
        handleCardTypeChange={handleCardTypeChange}
        handleDrop1={handleDrop1}
        handleDrop2={handleDrop2}
        handleDragOver={handleDragOver}
        file1={file1}
        file2={file2}
      />

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
          <FormLabel style={{ fontSize: '33px' }}>From</FormLabel><button onClick={() => setModalShow(true)} style={{border:'none'}}><MdCloudUpload style={{color:'orange',fontSize:'1.5em'}}/></button> * Upload your Aaadhar card to automaticaly fill this field

          <FormGrid>
            <FormLabel htmlFor="first-name" required>
               Name
            </FormLabel>
            <OutlinedInput
              id="first-name"
              name="from_name"
              value={form.from_name} 
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
              value={form.from_address} 
              onChange={handleChange}
              type="address1"
              autoComplete="from_address"
              required
            />
            <FormLabel htmlFor="address2">Postal code</FormLabel>
            <OutlinedInput
              id="address2"
              onChange={handleChange}
              value={form.from_zipcode}
              name="from_zipcode"
              type="zipcode1"
              placeholder="123456"
              autoComplete="zipcode"
            />
             <Grid container spacing={2}>
             <Grid item xs={6}>
    <FormLabel htmlFor="state" required>
      State
    </FormLabel>
    <TextField
      required
      fullWidth
      name="from_state"
      value={form.from_state}
      id="from-state"
      onChange={handleChange}
    >
    </TextField>
  </Grid>

  <Grid item xs={6}>
    <FormLabel htmlFor="district" required>
      District
    </FormLabel>
    <TextField
      required
      fullWidth
      name="from_district"
      id="from-district"
      value={form.from_district}
      onChange={handleChange}
    >
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
         <Grid container spacing={2}>
         <Grid item xs={6}>
    <FormLabel htmlFor="state" required>
      State
    </FormLabel>
    <TextField
      required
      fullWidth
      value={address.to_state ||form.to_state}
      name="to_state"
      id="state"
      onChange={handleChange}
    >
    </TextField>
  </Grid>

  <Grid item xs={6}>
    <FormLabel htmlFor="district" required>
      District
    </FormLabel>
    <TextField
      required
      fullWidth
      name="to_district"
      id="district"
      value={address.to_district || form.to_district}
      onChange={handleChange}
    >
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
            <Button onClick={submitAddress}>Save this address to address book</Button>

          </FormGrid>
        </div> 
      </Grid>
    </Grid>
    <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Grid item>
              <Button
                type="submit"
                onClick={handleSubmit}
                style={{
                  backgroundColor: 'orange',
                  color: 'white',
                  padding: '10px 40px',
                  borderRadius: '5px',  
                  marginBottom:'10px',
                }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
    </form>
        </div>
    )   
}
export default Form_1;