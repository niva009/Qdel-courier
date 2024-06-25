import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BasicTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/getallData/getallData')
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error, "error information");
      });
  }, []);

  const getPaymentStatusStyle = (status) => {
    if (status === 'payment success') {
      return { color: 'green', fontWeight: 'bolder' };
    } else if (status === 'payment fail') {
      return { color: 'red', fontWeight: 'bolder' };
    } else if (status === 'payment pending') {
      return { color: 'yellow', fontWeight: 'bolder' };
    } else {
      return {};
    }
  };

  const getStatusStyle = (status) => {
    const normalizedStatus = status.toLowerCase(); // Normalize the status text for consistent comparison
    
    switch (normalizedStatus) {
      case 'order created':
        return { backgroundColor: '#0a8f3f', color: 'white', fontWeight: 'bolder' };
      case 'order picked':
        return { backgroundColor: '#1906c2', color: 'white', fontWeight: 'bolder' };
      case 'handle to nearest location':
        return { backgroundColor: '#f7dc6f', color: 'black', fontWeight: 'bolder' };
      case 'order shipped':
        return { backgroundColor: 'black', color: 'white', fontWeight: 'bolder' };
      case 'product delivered':
        return { backgroundColor: 'orange', color: 'white', fontWeight: 'bolder' };
      default:
        return {};
    }
  };
  
  console.log(data, "data information");

  const buttonStyle = {
    width: '140px',  // Define button width
    height: '40px'  // Define button height
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ marginLeft: '10px' }}>No</TableCell>
            <TableCell>Invoice Id</TableCell>
            <TableCell align="right">Invoice Date</TableCell>
            <TableCell align="right">Total Amount</TableCell>
            <TableCell align="right">Payment Status</TableCell>
            <TableCell align="right">Product Status</TableCell>
            <TableCell align="right">Plan</TableCell>
            <TableCell align="right">Complete Information</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.Invoice?.invoiceId}</TableCell>
              <TableCell align="right">{item.Invoice?.invoiceDate}</TableCell>
              <TableCell align="right">{item.Invoice?.totalPrice} Rs</TableCell>
              <TableCell align="right" style={getPaymentStatusStyle(item.Invoice?.paymentStatus)}>
                {item.Invoice?.paymentStatus}
              </TableCell>
              <TableCell align="right">
                <Button variant="contained" style={{ ...getStatusStyle(item.Invoice?.status), ...buttonStyle }}>
                  {item.Invoice?.status}
                </Button>
              </TableCell>
              <TableCell align="right">{item.Invoice?.choosedPlane}</TableCell>
              <TableCell align="right">
                <Button variant="contained" style={buttonStyle}>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
