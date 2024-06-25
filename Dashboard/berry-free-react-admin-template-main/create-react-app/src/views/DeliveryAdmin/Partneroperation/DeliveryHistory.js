import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import {jwtDecode} from 'jwt-decode'; // Correct import

const token = localStorage.getItem('token');
let userId;

if (token) {
  try {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  } catch (error) {
    console.error('Error decoding token:', error);
  }
}
console.log(userId, "user id information");

const columns = [
  { width: 200, label: 'Pickup Point', dataKey: 'from_name' },
  { width: 120, label: 'Total Amount (Rs)', dataKey: 'Location.deliveryPrice', numeric: true },
  { width: 120, label: 'Total Distance (Km)', dataKey: 'Location.deliveryDistance', numeric: true },
  { width: 120, label: 'Payment Status', dataKey: 'from_phone_number', numeric: true },
  { width: 120, label: 'View', dataKey: 'from_address', numeric: true },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
//   TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {(() => {
            const value = column.dataKey.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), row);
            if (column.dataKey === 'Location.deliveryPrice') {
              return value !== null ? `Rs ${parseFloat(value).toFixed(2)}` : 'N/A';
            }
            if (column.dataKey === 'Location.deliveryDistance') {
              return value !== null ? `${parseFloat(value).toFixed(2)} Km` : 'N/A';
            }
            if (column.label === 'View') {
              return <button onClick={() => console.log('View button clicked for row:', row)}>View</button>;
            }
            return value;
          })()}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function ReactVirtualizedTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (userId) {
      axios.get('http://localhost:3001/api/getallData/getallData')
        .then((response) => {
          console.log('API Response:', response.data); // Log the entire response

          if (response.data && Array.isArray(response.data.data)) {
            const filteredData = response.data.data.filter(item => item.Invoice?.collectedBy === userId);
            console.log('Filtered Data:', filteredData); // Log the filtered data
            setData(filteredData);
          } else {
            console.error('Unexpected response structure:', response.data);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [userId]);

  console.log("filtered data", data);

  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
