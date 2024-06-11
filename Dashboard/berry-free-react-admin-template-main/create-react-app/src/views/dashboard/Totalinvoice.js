import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import axios from 'axios';

const columns = [
  { id: 'invoiceId', label: 'InvoiceId', minWidth: 170 },
  { id: 'invoiceDate', label: 'Invoice Date', minWidth: 100 },
  { id: 'productStatus', label: 'Product Status', minWidth: 170, align: 'right' },
  { id: 'paymentStatus', label: 'Payment Status', minWidth: 170, align: 'right' },
  { id: 'completeInformation', label: 'Complete Information', minWidth: 170, align: 'right' },
];

function createData(invoiceId, invoiceDate, productStatus, paymentStatus) {
  return { invoiceId, invoiceDate, productStatus, paymentStatus };
}

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getallData');
        const data = response.data; // Directly access response data from Axios
        console.log(data,"data gettttttttttt")
        const formattedData = data.map((item) =>
          createData(item.invoiceId, item.invoiceDate, item.productStatus, item.paymentStatus)
        );
        setRows(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewClick = (invoiceId) => {
    // Handle the view button click, e.g., navigate to a detailed view page or open a modal
    console.log('View button clicked for invoiceId:', invoiceId);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <h2 style={{ textAlign: 'center', padding: '20px 0px' }}>Total Invoice Details</h2>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Invoice
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.invoiceId}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'completeInformation' ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleViewClick(row.invoiceId)}
                            >
                              View
                            </Button>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
