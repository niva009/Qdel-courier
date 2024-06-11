import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const UploadModal = ({ show, onHide, handleUpload, handleFileChange1, handleFileChange2, handleDrop1, handleDrop2, handleDragOver, file1, file2 }) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Upload Aadhar Card Image Here
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>We don't save and share your Aadhar card image and data.</p>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div
            style={{
              width: '45%',
              height: '200px',
              border: '2px dashed #ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
            onDrop={handleDrop1}
            onDragOver={handleDragOver}
          >
            {file1 ? <p>{file1.name}</p> : <p>Drag & Drop front side of the Aadhar Image</p>}
            <input type="file" onChange={handleFileChange1} style={{ display: 'none' }} id="fileInput1" />
            <label htmlFor="fileInput1" style={{ cursor: 'pointer' }}>or choose file</label>
          </div>
          <div
            style={{
              width: '45%',
              height: '200px',
              border: '2px dashed #ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
            onDrop={handleDrop2}
            onDragOver={handleDragOver}
          >
            {file2 ? <p>{file2.name}</p> : <p>Drag & Drop back side of the Aadhar Image</p>}
            <input type="file" onChange={handleFileChange2} style={{ display: 'none' }} id="fileInput2" />
            <label htmlFor="fileInput2" style={{ cursor: 'pointer' }}>or choose file</label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleUpload}>Upload</Button>
      </Modal.Footer>
    </Modal>
  );
};

const ItemForm = () => {
  const [modalShow, setModalShow] = useState(false);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [test, setTest] = useState({});

  const handleFileChange1 = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleFileChange2 = (e) => {
    setFile2(e.target.files[0]);
  };

  const handleDrop1 = (e) => {
    e.preventDefault();
    setFile1(e.dataTransfer.files[0]);
  };

  const handleDrop2 = (e) => {
    e.preventDefault();
    setFile2(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = () => {
    const formData = new FormData();
    if (file1) formData.append('uploadedImages', file1);
    if (file2) formData.append('uploadedImages', file2);

    axios.post('http://localhost:3001/api/image-processing', formData)
      .then(response => {
        setTest(response.data.data);
        alert(`Name: ${response.data.data.name}\nAddress: ${response.data.data.address}\nPinCode: ${response.data.data.zipco}`);
      })
      .catch(error => {
        console.error('There was an error uploading the files!', error.message);
      })
      .finally(() => {
        setModalShow(false);
      });
  };

  console.log(test, "test info");

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <UploadModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleUpload={handleUpload}
        handleFileChange1={handleFileChange1}
        handleFileChange2={handleFileChange2}
        handleDrop1={handleDrop1}
        handleDrop2={handleDrop2}
        handleDragOver={handleDragOver}
        file1={file1}
        file2={file2}
      />
    </>
  );
};

export default ItemForm;
