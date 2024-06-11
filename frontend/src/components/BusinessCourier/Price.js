import React, { useState, useEffect } from 'react';
import NavbarOne from '../NavbarOne';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Modal from 'react-bootstrap/Modal';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import './Business.css';
import { Box, Typography, Tooltip, IconButton, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import './Business.css'
import DoorStep from './DoorStep';
import NearestLocation from './NearesLocation';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

function DescriptionModal ({ show, onHide, form }){
    const [update, setUpdate] = useState('');

    const Category =[

        {label:'ARTIFICIAL JEWELLERY',},
        {label:'BOOKS'},
        {label:'CAMERA'},
        {label:'CHARGER SET'},
        {label:'COMPUTER PARTS',},
        {label:'CORPORATE GIFTS',},
        {label:'DRY FRUIT',},
        {label:'ELECTRONIC ITEM',},
        {label:'FOOD ITEM (PACKED)',},
        {label:'FURNITURE',},
        {label:'HEADAPHONE',},
        {label:'HOME APPLIANCE ',},
        {label:'LUGGAGE',},
        {label:'LEF ITEMS',},
        {label:'MEDICINE',},
  
  
      ];


    useEffect(() => {
        if (form && form._id) {
            axios.get(`http://localhost:3001/api/getAddressData/${form._id}`)
                .then(response => {
                    setUpdate(response.data.data[0].productionDescription);
                })
                .catch(error => {
                    console.log('error', error);
                });
        }
    }, [form]);

    console.log(update,"updated data");

    const Datachange = (e)=>{   
    const { name, value } = e.target;
        setUpdate({
            ...update,
            [name]: value
        });
    }

    const FormSubmit = () => {
        axios.put(`http://localhost:3001/api/productionDescription/${form._id}`, update)
            .then(response => {
                console.log('product description updated successfully:', response.data);
                onHide(); // Close the modal after successful update
            })
            .catch(error => {
                console.log('Error updating data:', error);
            });
    };

    const handleClick = () => {
        FormSubmit();
        onHide();
    };

    return(
        <Modal show={show} onHide={onHide} aria-labelledby="modal-title">
        <Modal.Body>
            <Container>
          <div className="form-group">
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px',marginTop:'30px', backgroundColor: '#f5f5f5' }}>
        
    <TextField 
    fullWidth label="weight in kg"
     id="fullWidth"
      name='weight' 
      onChange={Datachange}
      value={update.weight || ''}
      /> <br/><br/>
            <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f5f5f5', }}>
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
    <Typography variant="subtitle1" component="div">
      Measurement (cm)
    </Typography>
    <Tooltip title="Enter the dimensions in centimeters">
      <IconButton size="small">
        <InfoIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </Box>
  <Box sx={{ display: 'flex', gap: 2 }}>
    <TextField
      label="Length"
      variant="outlined"
      size="small"
      value={update.length || ''}
      name='length'
      sx={{ flex: 1 }}
      onChange={Datachange}
    />
    <TextField
      label="Width"
      variant="outlined"
      size="small"
      value={update.width || ''}
      name='width'
      sx={{ flex: 1 }}
      onChange={Datachange}
    />
    <TextField
      label="Height"
      variant="outlined"
      name='height'
      size="small"
      value={update.height || ''}
      sx={{ flex: 1 }}
      onChange={Datachange}
    />
  </Box>
</Box>

<Box sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                 value={update.content || ''}        
                  label="Category"
                  name='content'
                  onChange={Datachange}
                >
                  {Category.map((content, index) => (
                    <MenuItem key={index} value={content.label}>
                      {content.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box><br/>
    <TextField onChange={Datachange} value={update.estimated_price}fullWidth label="product estimated total price in Rs"  placeholder=" 200 rs" id="fullWidth" name='estimated_price'   /> <br/><br/>
    <TextField onChange={Datachange} value={update.description} fullWidth label="Product Description"  rows={'6'} multiline id="fullWidth" name='description' /> <br/><br/>
  


</Box>

          </div>
            </Container>
        </Modal.Body>
        <Modal.Footer>
            <button style={{ color: "white", border: 'none', background: '#1663de', padding: '10px 20px' }} onClick={handleClick}>Update</button>
        </Modal.Footer>
    </Modal>
    )


}

function SimpleModal({ show, onHide, form }) {
    const [addressUpdate, setAddressUpdate] = useState('');


    useEffect(() => {
        if (form && form._id) {
            axios.get(`http://localhost:3001/api/getAddressData/${form._id}`)
                .then(response => {
                    setAddressUpdate(response.data.data[0]);
                })
                .catch(error => {
                    console.log('error', error);
                });
        }
    }, [form]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddressUpdate({
            ...addressUpdate,
            [name]: value
        });
    };

    const handleFormSubmit = () => {
        axios.put(`http://localhost:3001/api/addressUpdate/${form._id}`, addressUpdate)
            .then(response => {
                console.log('Data updated successfully:', response.data);
                onHide(); // Close the modal after successful update
            })
            .catch(error => {
                console.log('Error updating data:', error);
            });
    };

    const handleUpdateClick = () => {
        handleFormSubmit();
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} aria-labelledby="modal-title">
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={6} md={6}>
                            <Grid item xs={12} md={6}>
                                <div>
                                    <FormLabel style={{ fontSize: '33px' }}>From</FormLabel>
                                    <FormGrid>
                                        <FormLabel htmlFor="from_name" required>Name</FormLabel>
                                        <OutlinedInput
                                            id="from_name"
                                            value={addressUpdate.from_name || ''}
                                            name="from_name"
                                            type="text"
                                            placeholder="John"
                                            autoComplete="from_name"
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <FormLabel htmlFor="from_phone_number" required>Phone Number</FormLabel>
                                        <OutlinedInput
                                            id="from_phone_number"
                                            value={addressUpdate.from_phone_number || ""}
                                            name="from_phone_number"
                                            type="text"
                                            onChange={handleInputChange}
                                            placeholder="+91 12345"
                                            autoComplete="from_phone_number"
                                            required
                                        />
                                        <FormLabel htmlFor="from_address" required>Address</FormLabel>
                                        <OutlinedInput
                                            id="from_address"
                                            name="from_address"
                                            type="text"
                                            value={addressUpdate.from_address || ""}
                                            onChange={handleInputChange}
                                            autoComplete="from_address"
                                            required
                                        />
                                        <FormLabel htmlFor="from_zipcode" required>Postal code</FormLabel>
                                        <OutlinedInput
                                            id="from_zipcode"
                                            value={addressUpdate.from_zipcode || ""}
                                            name="from_zipcode"
                                            type="text"
                                            onChange={handleInputChange}
                                            placeholder="123456"
                                            autoComplete="zipcode"
                                        />
                                        <FormLabel htmlFor="from_city" required>City</FormLabel>
                                        <OutlinedInput
                                            id="from_city"
                                            value={addressUpdate.from_city || ""}
                                            name="from_city"
                                            type="text"
                                            onChange={handleInputChange}
                                            placeholder="chennai"
                                            autoComplete="City"
                                            required
                                        />
                                        <FormLabel style={{ marginTop: '20px' }} htmlFor="from_vat_id" required>Vat/Tax ID</FormLabel>
                                        <OutlinedInput
                                            value={addressUpdate.from_vat_id || ""}
                                            name="from_vat_id"
                                            type="text"
                                            onChange={handleInputChange}
                                            autoComplete="vat_id"
                                        />
                                        <FormLabel htmlFor="from_eoriNumber">Eori Number</FormLabel>
                                        <OutlinedInput
                                            value={addressUpdate.from_eoriNumber || ""}
                                            name="from_eoriNumber"
                                            type="text"
                                            onChange={handleInputChange}
                                            autoComplete="Eori-number"
                                        />
                                    </FormGrid>
                                </div>
                            </Grid>
                        </Col>
                        <Col xs={6} md={6}>
                            <Grid item xs={12} md={6}>
                                <div>
                                    <FormLabel style={{ fontSize: '33px' }}>To</FormLabel>
                                    <FormGrid>
                                        <FormLabel htmlFor="to_name" required>Name</FormLabel>
                                        <OutlinedInput
                                            value={addressUpdate.to_name || ""}
                                            id="to_name"
                                            type="text"
                                            name="to_name"
                                            placeholder="John"
                                            onChange={handleInputChange}
                                            autoComplete="to_name"
                                            required
                                        />
                                        <FormLabel htmlFor="to_phone_number" required>Phone Number</FormLabel>
                                        <OutlinedInput
                                            value={addressUpdate.to_phone_number || ""}
                                            id="to_phone_number"
                                            name="to_phone_number"
                                            type="text"
                                            onChange={handleInputChange}
                                            placeholder="+91 12345"
                                            autoComplete="to_phone_number"
                                            required
                                        />
                                        <FormLabel htmlFor="to_address" required>Address</FormLabel>
                                        <OutlinedInput
                                            id="to_address"
                                            name="to_address"
                                            value={addressUpdate.to_address}
                                            type="text"
                                            onChange={handleInputChange}
                                            autoComplete="to_address"
                                            required
                                        />
                                        <FormLabel htmlFor="to_zipcode" required>Postal code</FormLabel>
                                        <OutlinedInput
                                            id="to_zipcode"
                                            value={addressUpdate.to_zipcode || ""}
                                            name="to_zipcode"
                                            type="text"
                                            onChange={handleInputChange}
                                            placeholder="123456"
                                            autoComplete="zipcode"
                                        />
                                        <FormLabel htmlFor="to_city" required>City</FormLabel>
                                        <OutlinedInput
                                            value={addressUpdate.to_city || ""}
                                            id="to_city"
                                            name="to_city"
                                            type="text"
                                            onChange={handleInputChange}
                                            placeholder="chennai"
                                            autoComplete="City"
                                            required
                                        />
                                        <FormLabel style={{ marginTop: '20px' }} htmlFor="to_vat_id" required>Vat/Tax ID</FormLabel>
                                        <OutlinedInput
                                            value={addressUpdate.to_vat_id || ""}
                                            type="text"
                                            autoComplete="to_vat_id"
                                            name='to_vat_id'
                                        />
                                        <FormLabel htmlFor="to_eoriNumber">Eori Number</FormLabel>
                                        <OutlinedInput
                                            value={addressUpdate.to_eoriNumber || ""}
                                            type="text"
                                            autoComplete="Eori-number"
                                            name='to_eoriNumber'
                                        />
                                    </FormGrid>
                                </div>
                            </Grid>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <button style={{ color: "white", border: 'none', background: '#1663de', padding: '10px 20px' }} onClick={handleUpdateClick}>Update</button>
            </Modal.Footer>
        </Modal>
    );
}



const Price = () =>{
    const [modalShow, setModalShow] = useState(false);
    const [productModal,setProductModal] =useState(false);
    const [form, setForm] = useState('');
    const [userId, setUserId] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shipping, setSelectedShipping] = useState("");
    const [formType, setFormType] = useState('Doorstep');
    const [activeButton, setActiveButton] = useState('Doorstep');
    const [saveLocationCallback, setSaveLocationCallback] = useState(() => {});

    const [updateShipment, setUpdateShipment] = useState({
        height:"",
        length:"",
        width:"",
        weight:"",
        content:'',
        description:"",
        estimated_rate:"",
    })


/////////  foselection////////////////
    const handleButtonClick = (type) => {
        setFormType(type);
        setActiveButton(type);
    }
    const handleChange = (e) => {
        const { name, value} =e.target;
        setUpdateShipment({...updateShipment, [name]:value});
    }

    const handleSubmit =(e) =>{
        e.preventDefault()
        axios.put(`http://localhost:3001/api/productionDescription/${form._id}`,updateShipment)

        .then(response =>{
            console.log(response.data)
        })
        .catch(error =>{
            console.log(error)
        })
    }
///////////////for selection////////////

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decode = jwtDecode(token);
            setUserId(decode.userId);
            console.log(decode.userId); // Ensure userId is logged correctly
        }
    }, []);

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:3001/api/latest/${userId}`)
                .then((response) => {
                    setForm(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    }, [userId]);

    useEffect(() => {
        if (form && form._id) {
            axios.get(`http://localhost:3001/api/pricedetails/${form._id}`)
                .then(response => {
                    const { data } = response;
                    setShippingOptions([
                        {
                            id: 'standard',
                            name: 'Standard Shipping',
                            price: data.standardPrice,
                            description: 'Delivery within 5-7 business days.'
                        },
                        {
                            id: 'expressStandard',
                            name: 'Express Standard Shipping',
                            price: data.expressStandardPrice,
                            description: 'Delivery within 2-3 business days.'
                        },
                        {
                            id: 'expressPremium',
                            name: 'Express Premium Shipping',
                            price: data.expressPremiumPrice,
                            description: 'Delivery within two Days'
                        }
                    ]);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [form]);

    console.log(shippingOptions,"price details")

    const handleShippingChange = (option) => {
        setSelectedShipping(option);
    
        axios.put(`http://localhost:3001/api/updateinvoice/${form._id}`, {
            choosedPlane: option.name,
            totalPrice: option.price
        })
        .then(response => {
            console.log("Invoice information updated successfully", response);
        })
        .catch(error => {
            console.log(error);
        });
    };
    
    

const DateSelection = () => {
   
    if (formType === 'Doorstep') {
        return (
          <div>
            <DoorStep formId={form._id} />
        </div>
        );
    } else if (formType === 'NearestLocation') {
        return (
            <NearestLocation district={form.from_district} formId={form._id} />

        );
    }
    return null;
};
useEffect(() => {
    if (form && form._id) {
      const data = { formId: form._id };
      localStorage.setItem('FormId', JSON.stringify(data));
    }
  }, [form]);
  

    return(
        <div>
        <NavbarOne />

        <div style={{ marginTop: '30px' }}>
            <Container fluid style={{ marginTop: '70px', paddingTop: '20px', padding: '20px,40px', backgroundColor: '#c2b5a7', width: '100%' }}>
                <Row>
                    <Col xs={5}>
                        <label style={{ color: 'black', padding: '10px 0px' }}>From <LocationOnIcon /></label>
                        {form && (
                            <>
                                <p style={{ marginBottom: '0px' }}>{form.from_name}</p>
                                <p style={{ marginBottom: '0px' }}> {form.from_address},{form.from_city}</p>
                                <p style={{ marginBottom: '0px' }}>{form.from_zipcode}</p>
                                <p style={{ marginBottom: '0px' }}>{form.from_district},{form.from_state}</p>
                                <p style={{ marginBottom: '0px' }}>{form.from_phone_number}</p>
                                <p style={{ marginBottom: '0px' }}>{form.from_vat_id}</p>
                                <p style={{ marginBottom: '0px' }}>{form.from_eoriNumber}</p>
                            </>
                        )}
                    </Col>
                    <Col xs={5}>
                        <label style={{ color: 'black', padding: '10px 0px' }}>To <LocationOnIcon /></label>
                        {form && (
                            <>
                                <p style={{ marginBottom: '0px' }}>{form.to_name}</p>
                                <p style={{ marginBottom: '0px' }}> {form.to_address},{form.to_city}</p>
                                <p style={{ marginBottom: '0px' }}>{form.to_zipcode}</p>
                                <p style={{ marginBottom: '0px' }}>{form.to_district},{form.to_state}</p>
                                <p style={{ marginBottom: '0px' }}>{form.to_phone_number}</p>
                                <p style={{ marginBottom: '0px' }}>{form.to_vat_id}</p>
                                <p style={{ marginBottom: '0px' }}>{form.to_eoriNumber}</p>
                            </>
                        )}
                    </Col>
                    <Col xs={2} className="d-flex align-items-center justify-content-center">
                        <button onClick={() => setModalShow(true)} style={{ color: 'black', padding: '5px 20px', backgroundColor: 'white', color: 'black', border: 'none', }}>Edit</button>
                    </Col>
                </Row>
            </Container>
            <Container fluid style={{  padding: '20px,40px', backgroundColor: '#c2b5a7', width: '100%' }}>
             <Row>
                <Col xs={5}>
                <label style={{ color: 'black', padding: '10px 0px' }}>Packages <LocationOnIcon /></label>
                { form  && form.productionDescription &&(
                    <>
                                <p style={{ marginBottom: '0px' ,fontWeight:'bold' }}> Weight  {form.productionDescription.weight}Kg </p>
                                <p style={{ marginBottom: '0px', fontWeight:'bold' }}> Length * Breadth * height   {form.productionDescription.length} * {form.productionDescription.width} * {form.productionDescription.height}</p>
                                <p style={{ marginBottom: '0px', fontWeight:'bold' }}> Content  {form.productionDescription.content} </p>
                                <p style={{ marginBottom: '0px', fontWeight:'bold' }}> Estimated Price  {form.productionDescription.estimated_price} </p>
                                <p style={{ marginBottom: '0px',  fontWeight:'bold' }}> Description   {form.productionDescription.description} </p>

                    </>
                )}
                </Col>
                <Col xs={5} >

                </Col>
                <Col xs={2} className="d-flex align-items-center justify-content-center">
                <button onClick={() => setProductModal(true)} style={{ color: 'black', padding: '5px 20px', backgroundColor: 'white', color: 'black', border: 'none', }}>Edit</button>   
                </Col>
                </Row>
                </Container>
            <div>
                <SimpleModal show={modalShow} onHide={() => setModalShow(false)} form={form} />
                <DescriptionModal show={productModal} onHide={() => setProductModal(false)} form={form} />
                <div className='container'>
                        <h5  className='main-heading'>Choose Our Planes</h5>

                        <div className="shipping-options-container">
            {shippingOptions.map(option => (
                <div key={option.id} className="shipping-option">
                    <input
                        type="radio"
                        id={option.id}
                        name="shippingOption"
                        value={option.price}
                        onChange={() => handleShippingChange(option)}
                        className="shipping-option-input"
                    />
                    <label htmlFor={option.id} className="shipping-option-label">
                        <div className="shipping-option-header">
                            <span className="shipping-option-name">{option.name}</span>
                            <span className="shipping-option-price">${option.price}</span>
                        </div>
                        <div className="shipping-option-description">{option.description}</div>
                    </label>
                </div>
            ))}
        </div>

        <div className='container'>
                        <div className='button-container' style={{padding:'50px 0px'}}>
                            <button
                                className={`button-1 ${activeButton === 'Doorstep' ? 'active' : ''}`}
                                onClick={() => { handleButtonClick('Doorstep') }}>Doorstep Pickup</button>
                            <button
                                className={`button-2 ${activeButton === 'NearestLocation' ? 'active' : ''}`}
                                onClick={() => { handleButtonClick('NearestLocation') }}>Nearest Qdel center</button>
                        </div>
                        <div>
                            {DateSelection()}

                        </div>
                    </div>
                    </div>
                </div>
            </div>
                        
                         <div>
      </div>
        </div>
    )
}

export default Price