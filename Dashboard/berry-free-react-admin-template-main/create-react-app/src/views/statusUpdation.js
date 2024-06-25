import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Ensure correct import
import Dropdown from 'react-bootstrap/Dropdown';
import {jwtDecode} from 'jwt-decode';


function StatusUpdation() {


    const [statusMap, setStatusMap] = useState({});

    const token = localStorage.getItem('token');
    let userId = '';
  
    if (token) {
      try {
        const decoded = jwtDecode(token);
        userId = decoded.userId;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  const { id } = useParams();
  const [data, setData] = useState({});

  const handleOrderCollected = (id, status) => {
    axios.put(`http://localhost:3001/api/status-updation/${id}`, {
      userId: userId,
      status:status,
      
    })
      .then((response) => {
        console.log('Order status updated successfully', response);

        // Update the statusMap with the new status
        setStatusMap(prevStatusMap => ({
          ...prevStatusMap,
          [id]: status
        }));
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/getAddressData/${id}`)
      .then((response) => {
        setData(response.data.data[0]); // Adjusted to get the first item in data array
      })
      .catch((error) => {
        console.log("Error in fetching data", error);
      });
  }, [id]);

  const calculateVolumeWeight = () => {
    if (
      data.productionDescription?.length && 
      data.productionDescription?.width &&
      data.productionDescription?.height
    ) {
      const { length, width, height } = data.productionDescription;
      return (length * width * height) / 5000;
    }
    return "N/A";
  };
  console.log(data, "data information");

  return (
    <div style={styles.container}>
      <div style={styles.header}>Qdel Courier Service</div>
      <div style={styles.infoContainer}>
        <div style={styles.infoCard}>
          <div style={styles.sectionTitle}>From</div>
          <div style={{fontWeight:'bolder'}} >Name: {data.from_name}</div>
          <div>Address: {data.from_address}</div>
          <div>Phone Number: {data.from_phone_number}</div>
          <div>Zipcode: {data.from_zipcode}</div>
        </div>
        <div style={styles.infoCard}>
          <div style={styles.sectionTitle}>To</div>
          <div style={{fontWeight:'bolder'}} >Name: {data.to_name}</div>
          <div>Address: {data.to_address}</div>
          <div>Phone Number: {data.to_phone_number}</div>
          <div>Zipcode: {data.to_zipcode}</div>
        </div>
      </div>
      <div style={styles.additionalInfo}>
        <div>Actual Weight: <span style={{fontWeight:'bold'}} >{data.productionDescription?.weight} Kg</span></div>
        <div>Volume Weight:  <span style={{fontWeight:'bold'}} >{calculateVolumeWeight()}</span></div>
        <div>Chosen Plane: <span style={{fontWeight:'bold'}} >{data.Invoice?.choosedPlane}</span></div>
        <div>Total Price: <span style={{fontWeight:'bold'}} >{data.Invoice?.totalPrice} Rs</span></div>
        <div>Payment Status: <span style={{fontWeight:'bold'}} >{data.Invoice?.paymentStatus}</span></div>
      </div>
      <div style={styles.buttonContainer}>
      <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {statusMap[data._id] === 'collected' ? 'Change Status' : statusMap[data._id]}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleOrderCollected(data._id, "Order Picked")}>Order Picked</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOrderCollected(data._id, "Handle to Nearest Location")}>Handle to Nearest Location</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOrderCollected(data._id, "Product Delivered")}>Product Delivered</Dropdown.Item>
                </Dropdown.Menu>
    </Dropdown>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  header: {
    textAlign: 'center',
    fontSize: '30px',
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#4CAF50'
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  infoCard: {
    width: '45%',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    border: '1px solid #ddd'
  },
  sectionTitle: {
    fontSize: '18px',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#333'
  },
  additionalInfo: {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    border: '1px solid #ddd'
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '20px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  }
};
 
export default StatusUpdation;
