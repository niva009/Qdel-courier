import React, { useEffect, useState } from 'react';
import NavbarOne from '../NavbarOne';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBRadio, MDBRow } from "mdb-react-ui-kit";
import axios from 'axios'

function PaymentForm() {
  const [formData, setFormData] = useState(null);
  const [boxinfo, setBoxinfo] = useState(null);
  const [pickupdate, setPickupDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [trackingId, setTrackingId] = useState("");

  useEffect(() => {
    const courierData = localStorage.getItem('courierForm_1');
    if (courierData) setFormData(JSON.parse(courierData));
  }, []);

  useEffect(() => {
    const BoxData = localStorage.getItem('box-info');
    if (BoxData) setBoxinfo(JSON.parse(BoxData));
  }, []);

  useEffect(() => {
    const pickupDate = localStorage.getItem('select-date');
    if (pickupDate) setPickupDate(new Date(JSON.parse(pickupDate)));
  }, []);

  useEffect(() => {
    const delivery_date = localStorage.getItem('estimated-date');
    if (delivery_date) setDeliveryDate(new Date(JSON.parse(delivery_date)));
  }, []);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const prefix = "qdel";
    const number = Math.floor(Math.random() * 10000);
    const formattedNumber = String(number).padStart(4, '0');
    const generatedInvoiceNumber = prefix + formattedNumber;
    setInvoiceNumber(currentInvoiceNumber => {
      if (!currentInvoiceNumber) {
        return generatedInvoiceNumber;
      }
      return currentInvoiceNumber;
    });
  }, []);

  useEffect(() => {
    const prefix = "QD";
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 90000) + 10000;
    const trackingId = `${prefix}${randomSuffix}`;
    console.log(trackingId);
    setTrackingId(currentTrackingId => {
      if (!currentTrackingId) {
        return trackingId;
      }
      return currentTrackingId;
    });
  }, []);

  // console.log(formData, "indian");
  // console.log(boxinfo, "pakistan");

  useEffect(() => {
    // Check if all fields are present
    if (
      formData &&
      boxinfo &&
      pickupdate &&
      deliveryDate &&
      invoiceNumber &&
      invoiceDate &&
      trackingId
    ) {
      axios
        .post(
          'http://localhost:3001/api/maindata',
          {
            formData: formData,
            boxinfo: boxinfo,
            pickupdate: pickupdate,
            deliveryDate: deliveryDate,
            invoiceNumber: invoiceNumber,
            invoiceDate: invoiceDate,
            trackingId: trackingId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((response) => {
          console.log('data sent successfully', response.data);
        })
        .catch((error) => {
          console.error('There was a problem with the axios request:', error);
        });
    } else {
      const missingField = Object.keys({
        formData,
        boxinfo,
        pickupdate,
        deliveryDate,
        invoiceNumber,
        invoiceDate,
        trackingId,
      }).find((key) => !key);
      console.error(`${missingField} is not defined. ${missingField} not saved successfully.`);
    }
  }, [formData, boxinfo, pickupdate, deliveryDate, invoiceNumber, invoiceDate, trackingId]);

  // send invoice id into db

  useEffect(()=>{
    if(invoiceNumber!=null){
    localStorage.setItem('invoicenumber', JSON.stringify(invoiceNumber));
    }localStorage.setItem('invoicedata',JSON.stringify([]));
  },[invoiceNumber]);


  return(

    <>
     <NavbarOne />
      <Container fluid style={{marginTop:'80px',  paddingTop: '20px', padding: '20px,40px', backgroundColor: '#eee', width: '100%' }}>
        <Row>
          <Col xs={6}>
            <label style={{ color: 'black', padding: '10px 0px' }}>From <LocationOnIcon /></label>
            {formData && boxinfo && (
              <>
                <p style={{ marginBottom: '0px' }}>{formData.from_name}</p>
                <p style={{ marginBottom: '0px' }}>{formData.from_address}</p>  
                <p style={{ marginBottom: '0px' }}>{formData.from_city}</p>
                <p style={{ marginBottom: '0px' }}>{formData.From_zipcode}</p>
                <p style={{ marginBottom: '0px' }}>{formData.from_state}</p>
                <p style={{ marginBottom: '0px' }}>{formData.from_phone_number}</p>
                <p style={{ marginBottom: '0px' }} ><LocalShippingIcon/>   no packages: {boxinfo.noOfPackages} total weight :{boxinfo.totalWeight}kg volume weight:({boxinfo.length}*{boxinfo.breadth}*{boxinfo.width} Cm) </p>
                <p style={{ marginBottom: '0px' }} > <DateRangeIcon/>pickup date :{pickupdate? formatDate(pickupdate) : "Loading...."}</p>
              </>
            )}
          </Col>
          <Col xs={6}>
            <label style={{ color: 'black', padding: '10px 0px' }}>To <LocationOnIcon /></label>
            {formData && (
              <>
                <p style={{ marginBottom: '0px' }}>{formData.to_name}</p>
                <p style={{ marginBottom: '0px' }}>{formData.to_address}</p>
                <p style={{ marginBottom: '0px' }}>{formData.to_city}</p>
                <p style={{ marginBottom: '0px' }}>{formData.to_zipcode}</p>
                <p style={{ marginBottom: '0px' }}>{formData.to_state}</p>
                <p style={{ marginBottom: '0px' }}>{formData.to_phone_number}</p><br></br>
              </>

            )}
          </Col>
        </Row>
      </Container>
      <MDBContainer fluid className="p-5" style={{ backgroundColor: "#eee" }}>
      <MDBCard>
        <MDBCardBody>
          <MDBRow className="d-flex justify-content-center pb-5">
            <MDBCol md="7" xl="5" className="mb-4 mb-md-0">
              <h6 className='text-danger'>Invoice Number: {invoiceNumber}</h6>
              <h6 className='text-success'>Invoice date:  {formatDate(invoiceDate)}</h6>
              <h6 className='text-success'>delivery date: {deliveryDate? formatDate(deliveryDate) : "Loading...."} </h6>
              <h6 className="text-success"> Total Price 720.00 Rs</h6>
              <hr />
              <div className="pt-2">
                <div className="d-flex pb-2">
                  <div className="ms-auto">
                    <button style={{background:'#0d6efd',border:'1px solid white',color:'white'}}>+ ADD ANOTHER CARD</button>
                  </div>
                </div>
                <p>
                  This is an estimate for the portion of your order (not covered
                  by insurance) due today . once insurance finalizes their
                  review refunds and/or balances will reconcile automatically.
                </p>
                <div className="d-flex flex-row pb-3">
                  <div className="d-flex align-items-center pe-2">
                    <MDBRadio name="radioNoLabel" id="radioNoLabel1" checked />
                  </div>
                  <div className="rounded border d-flex w-100 p-3 align-items-center">
                    <p className="mb-0">
                      <MDBIcon
                        fab
                        icon="cc-visa"
                        size="lg"
                        className="text-primary pe-2"
                      />{" "}
                      Visa Debit Card
                    </p>
                    <div className="ms-auto">************3456</div>
                  </div>
                </div>
                <div className="d-flex flex-row pb-3">
                  <div className="d-flex align-items-center pe-2">
                    <MDBRadio name="radioNoLabel" id="radioNoLabel1" checked />
                  </div>
                  <div className="rounded border d-flex w-100 p-3 align-items-center">
                    <p className="mb-0">
                      <MDBIcon
                        fab
                        icon="cc-mastercard"
                        size="lg"
                        className="text-dark pe-2"
                      />{" "}
                      Mastercard Office
                    </p>
                    <div className="ms-auto">************1038</div>
                  </div>
                </div>
                <MDBBtn block size="lg">
                  Proceed to payment
                </MDBBtn>
              </div>
            </MDBCol>
            <MDBCol md="5" xl="4" offsetXl="1">
              {" "}
              <div className="py-4 d-flex justify-content-end">
                <h6>
                  <a href="/">Cancel and return to website</a>
                </h6>
              </div>
              <div
                className="rounded d-flex flex-column p-2"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="p-2 me-3">
                  <h4>Price Details</h4>
                </div>
                <div className="p-2 d-flex">
                  <MDBCol size="8">Transportation Charge</MDBCol>
                  <div className="ms-auto">460 Rs</div>
                </div>
                <div className="p-2 d-flex">
                  <MDBCol size="8">Fuel Surcharge</MDBCol>
                  <div className="ms-auto">160 Rs</div>
                </div>
                <div className="p-2 d-flex">
                  <MDBCol size="8">Shipment Protection</MDBCol>
                  <div className="ms-auto">30 Rs</div>
                </div>
                <div className="p-2 d-flex">
                  <MDBCol size="8">Insurace Charge</MDBCol>
                  <div className="ms-auto">+ 70 Rs</div>
                </div> 
                <div className="border-top px-2 mx-2"></div>
                <div className="p-2 d-flex pt-3">
                  <MDBCol size="8">
                    <b>Total</b>
                  </MDBCol>
                  <div className="ms-auto">
                    <b className="text-success">720.00 Rs</b>
                  </div>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>

    </>
  )
}
export default PaymentForm;