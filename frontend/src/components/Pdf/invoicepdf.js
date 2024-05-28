import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page, View, Text, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold', // Set fontWeight to 'bold'
    color: 'orange',
  },
  invoicenumber:{
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
    marginTop: 30
  },
  date:{
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
    marginTop: 6,
  },
  blueLine: {
    backgroundColor: 'orange',
    height: 1,
    marginTop: 20,
    marginBottom: 10,
  },
  subHeading:{
    fontSize: 15,
    marginTop: 10,
    marginBottom:20,
  },
  charges:{
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20
  },
  subCharges:{
    fontSize: 15,
    marginTop:15,
  },
  innerText:{
    fontSize:13,
    color:'black',
    marginTop:3,
  },
  billingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amount: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const InvoicePdf = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/invoice/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.data);
        }
      })
      .catch((error) => {
        console.log('Data not found', error);
      });
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PDFViewer style={{ width: '100%', height: '800px' }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.heading}>Qdel Courier Service Limited</Text>
              <Text style={styles.invoicenumber}>Invoice Number: Qd3445 </Text>
              <Text style={styles.date}> Date: 10/04/2024 </Text>
              <View style={styles.blueLine}></View>
              <View style={styles.billingSection}>
                <View>
                  <Text style={styles.subHeading}>Bill From</Text>
                  <Text style={styles.innerText}>{data.formData.from_name}</Text>
                  <Text style={styles.innerText}>{data.formData.from_address}</Text>
                  <Text style={styles.innerText}>{data.formData.from_zipcode}</Text>
                  <Text style={styles.innerText}>{data?.formData?.from_city}</Text>
                  <Text style={styles.innerText}>{data?.formData?.from_district}</Text>
                  <Text style={styles.innerText}>{data?.formData?.from_state}</Text>
                  <Text style={styles.innerText}>{data.formData.from_phone_number}</Text>
                </View>
                <View>
                <Text style={styles.subHeading}>Bill To</Text>
                  <Text style={styles.innerText}>{data.formData.to_name}</Text>
                  <Text style={styles.innerText}>{data.formData.to_address}</Text>
                  <Text style={styles.innerText}>{data.formData.to_zipcode}</Text>
                  <Text style={styles.innerText}>{data?.formData?.to_city}</Text>
                  <Text style={styles.innerText}>{data?.formData?.to_district}</Text>
                  <Text style={styles.innerText}>{data?.formData?.to_state}</Text>
                  <Text style={styles.innerText}>{data.formData.to_phone_number}</Text>
                </View>
              </View>
              <View style={styles.blueLine}></View>
                <View style={styles.amount}>
                  <View>
                  <Text style={styles.charges}>Charges</Text>
                  <Text style={styles.subCharges}>Transportation charges</Text>
                  <Text style={styles.subCharges}>Fuel Charge</Text>
                  <Text style={styles.subCharges}>ShipMent Protection </Text>
                  <Text style={styles.subCharges}>Insurance Charge </Text>
                  </View>
                  <View>
                  <Text style={styles.charges}>Amount</Text>
                  <Text style={styles.subCharges}> 370 Rs</Text>
                  <Text style={styles.subCharges}> 110 Rs</Text>
                  <Text style={styles.subCharges}>  80 Rs </Text>
                  <Text style={styles.subCharges}>  30 Rs </Text>
                  </View>
              </View>
              <View style={styles.blueLine}></View>

              <View style={styles.amount}>

                <View>
                <Text style={styles.charges}>Total Charge</Text>
              </View>

              <View>
                <Text style={styles.charges}> 570 Rs</Text>
              </View>
            </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default InvoicePdf;
