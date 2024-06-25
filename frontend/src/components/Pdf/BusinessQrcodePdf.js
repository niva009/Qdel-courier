import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page, View, StyleSheet, PDFViewer, Image, Text } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode';

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
  qrcode: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'orange',
  },
  table: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    margin: 10,
    borderWidth: 1,
  },
  tableRow: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  tableCell: {
    flexGrow: 1,
    padding: 5,
    borderColor: '#000',
    borderWidth: 1,
  },
  tableHeader: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
  },
  TableData: {
    fontSize: 12,
  },
  addressContainer: {
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
});

const BusinessInvoicePdf = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [qrCodeBase64, setQrCodeBase64] = useState('');

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

  useEffect(() => {
    if (data) {
      const qrData = `http://localhost:3002/qdel/delivery/statusUpdation/${data._id}`;

      // Generate QR code as base64
      QRCode.toDataURL(qrData, { width: 150 })
        .then((url) => {
          setQrCodeBase64(url);
        })
        .catch((error) => {
          console.error('Error generating QR code:', error);
        });
    }
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PDFViewer style={{ width: '100%', height: '800px' }}>
        <Document>
          <Page size="A5" style={styles.page}>
            <View style={styles.section}>
              <View>
                <Text style={styles.heading}>Qdel Courier Service Limited</Text>
              </View>
              <View style={styles.qrcode}>
                {qrCodeBase64 && <Image style={{ width: 250 }} src={qrCodeBase64} />}
              </View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text style={styles.tableHeader}>Billing Address:</Text>
                    <View style={styles.addressContainer}>
                      <Text style={styles.TableData}>{data.from_address}</Text>
                      <Text style={styles.TableData}>{data.from_zipcode}</Text>
                      <Text style={styles.TableData}>{data.from_city}</Text>
                      <Text style={styles.TableData}>{data.from_district || ''}</Text>
                      <Text style={styles.TableData}>{data.from_state || ''}</Text>
                    </View>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.tableHeader}>Shipping Address:</Text>
                    <View style={styles.addressContainer}>
                      <Text style={styles.TableData}>{data.to_address}</Text>
                      <Text style={styles.TableData}>{data.to_zipcode}</Text>
                      <Text style={styles.TableData}>{data.to_city}</Text>
                      <Text style={styles.TableData}>{data.to_district || ''}</Text>
                      <Text style={styles.TableData}>{data.to_state || ''}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default BusinessInvoicePdf;
