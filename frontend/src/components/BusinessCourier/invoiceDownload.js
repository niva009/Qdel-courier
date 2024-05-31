import React, { useState, useEffect, startTransition } from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { FaDownload, FaFileDownload } from "react-icons/fa";
import NavbarOne from '../NavbarOne';
import { useNavigate } from 'react-router-dom';

const InvoiceDownload = () => {
  const [formId, setFormId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('FormId');
    if (storedData) {
      const data = JSON.parse(storedData);
      if (data && data.formId) {
        console.log(data.formId);
        setFormId(data.formId); // Use the stored form ID
      } else {
        console.error("formId not found in the stored data");
      }
    } else {
      console.error("No data found in localStorage for key 'FormId'");
    }
  }, []);

  return (
    <>
      <NavbarOne />
      <Box mb={20}>
        <Box component='section' pt='6rem' pb={{ xs: '0', md: '5rem' }}>
          <Container>
            <Box textAlign='center'>
              <Typography
                variant='h1'
                sx={{
                  maxWidth: '16ch',
                  mx: 'auto',
                  fontSize: { xs: '2.25rem', sm: '3rem', lg: '4rem' },
                  fontFamily: 'heading',
                  letterSpacing: 'tighter',
                  fontWeight: 'extrabold',
                  mb: '16px',
                  lineHeight: '1.2',
                }}
              >
                Effortlessly Download Your Courier Invoice and QR Code
              </Typography>

              <Typography
                variant='h2'
                sx={{
                  maxWidth: '16ch',
                  mx: 'auto',
                  fontSize: { xs: '1.75rem', sm: '2.25rem', lg: '3rem' },
                  fontFamily: 'heading',
                  letterSpacing: 'tight',
                  fontWeight: 'bold',
                  mb: '16px',
                  lineHeight: '1.2',
                  color: '#008080',
                }}
              >
                Quick, Easy, and Accessible
              </Typography>

              <Typography
                variant='body1'
                sx={{
                  maxWidth: '560px',
                  mx: 'auto',
                  color: 'gray.500',
                  fontSize: { xs: 'lg', lg: 'xl' },
                  mt: '6',
                }}
              >
                Our platform provides a seamless way to manage your courier needs. Download your courier invoice and QR code with just a click, ensuring a hassle-free experience.
              </Typography>

              <Stack
                mt={10}
                spacing={4}
                justifyContent='center'
                direction={{ xs: 'column', sm: 'row' }}
              >
                  <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    sx={{
                      height: '4rem',
                      px: '40px',
                      fontSize: '1.2rem',
                    }}
                    endIcon={<FaFileDownload fontSize='0.8em' />}
                    onClick={() => {
                      startTransition(() => {
                        navigate(`/pdfinvoice/${formId}`);
                      });
                    }}
                  >
                    Download Invoice
                  </Button>

                  <Button
                    variant='outlined'
                    size='large'
                    sx={{
                      height: '4rem',
                      px: '40px',
                      fontSize: '1.2rem',
                    }}
                    startIcon={<FaDownload size='1.5em' />}
                    onClick={() => {
                      startTransition(() => {
                        navigate(`/qrcodepdf/${formId}`);
                      });
                    }}
                  >
                    Download QR Code
                  </Button>
              </Stack>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default InvoiceDownload;
