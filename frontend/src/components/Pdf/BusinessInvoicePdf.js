import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page, View, Text, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'orange',
  },
  invoicenumber: {
    fontSize: 12,
    color: 'black',
    textAlign: 'left',
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: 'black',
    textAlign: 'left',
    marginBottom: 20,
  },
  blueLine: {
    backgroundColor: 'orange',
    height: 2,
    marginVertical: 20,
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  charges: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subCharges: {
    fontSize: 14,
    marginVertical: 2,
  },
  innerText: {
    fontSize: 12,
    color: 'black',
    marginVertical: 2,
  },
  billingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  amount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  amountColumn: {
    width: '45%',
  },
});

const BusinessInvoicePdf = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/getAddressData/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.data[0]);
        }
      })
      .catch((error) => {
        console.log('Data not found', error);
      });
  }, [id]);

  const calculateTotalPrice = (invoice) => {
    const total = parseFloat(invoice.totalPrice) + parseFloat(invoice.smsCharge) + parseFloat(invoice.pickupCharge) + parseFloat(invoice.extraSecurityCharge);
    return total.toFixed(2);
  };

  if (!data) {
    return <div>Loading invoice pdf...</div>;
  }

  const totalPrice = calculateTotalPrice(data.Invoice);

  return (
    <div>
      <PDFViewer style={{ width: '100%', height: '800px' }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.heading}>Qdel Courier Service Limited</Text>
              <Text style={styles.invoicenumber}>Invoice Number: Qd3445</Text>
              <Text style={styles.date}>Date: {data.Invoice.invoiceDate}</Text>
              <View style={styles.blueLine}></View>
              <View style={styles.billingSection}>
                <View style={styles.amountColumn}>
                  <Text style={styles.subHeading}>Bill From</Text>
                  <Text style={styles.innerText}>{data.from_name}</Text>
                  <Text style={styles.innerText}>{data.from_address}</Text>
                  <Text style={styles.innerText}>{data.from_zipcode}</Text>
                  <Text style={styles.innerText}>{data.from_city}</Text>
                  <Text style={styles.innerText}>{data.from_district}</Text>
                  <Text style={styles.innerText}>{data.from_state}</Text>
                  <Text style={styles.innerText}>{data.from_phone_number}</Text>
                </View>
                <View style={styles.amountColumn}>
                  <Text style={styles.subHeading}>Bill To</Text>
                  <Text style={styles.innerText}>{data.to_name}</Text>
                  <Text style={styles.innerText}>{data.to_address}</Text>
                  <Text style={styles.innerText}>{data.to_zipcode}</Text>
                  <Text style={styles.innerText}>{data.to_city}</Text>
                  <Text style={styles.innerText}>{data.to_district}</Text>
                  <Text style={styles.innerText}>{data.to_state}</Text>
                  <Text style={styles.innerText}>{data.to_phone_number}</Text>
                </View>
              </View>
              <View style={styles.blueLine}></View>
              <View style={styles.amount}>
                <View style={styles.amountColumn}>
                  <Text style={styles.charges}>Charges</Text>
                  <Text style={styles.subCharges}>Qdel service Charge</Text>
                  <Text style={styles.subCharges}>SMS Charge</Text>
                  <Text style={styles.subCharges}>Pickup Charge</Text>
                  <Text style={styles.subCharges}>Extra Security Charge</Text>
                </View>
                <View style={styles.amountColumn}>
                  <Text style={styles.charges}>Amount</Text>
                  <Text style={styles.subCharges}>{data.Invoice.totalPrice}</Text>
                  <Text style={styles.subCharges}>{data.Invoice.smsCharge}</Text>
                  <Text style={styles.subCharges}>{data.Invoice.pickupCharge}</Text>
                  <Text style={styles.subCharges}>{data.Invoice.extraSecurityCharge}</Text>
                </View>
              </View>
              <View style={styles.blueLine}></View>
              <View style={styles.amount}>
                <Text style={styles.charges}>Total Price</Text>
                <Text style={styles.charges}>{totalPrice}</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default BusinessInvoicePdf;
