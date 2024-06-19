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
    axios.get('http://localhost:3001/api/getallData')
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error, "error information");
      });
  }, []);

  console.log(data, "data information");

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
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
              <TableCell>{item.Invoice?.invoiceId}</TableCell>
              <TableCell align="right">{item.Invoice?.invoiceDate}</TableCell>
              <TableCell align="right">{item.Invoice?.totalPrice}</TableCell>
              <TableCell align="right">{item.Invoice?.paymentStatus}</TableCell>
              <TableCell align="right">{item.Invoice?.status}</TableCell>
              <TableCell align="right">{item.Invoice?.choosedPlane}</TableCell>
              <TableCell align="right">
                <Button variant="contained">View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
