import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import emailjs from 'emailjs-com';
import { useNavigate} from 'react-router';

export default function Deliverypartnerlist() {
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/api/deliverlist')
            .then((response) => {
                const filteredData = response.data.data.filter(item => item.Role === '0');
                setData(filteredData);
            })
            .catch((err) => {
                console.log(err, 'data getting error');
            });
    }, []);

    const sendEmail = (email, name) => {
        const serviceId = 'service_nibll0l';
        const templateId = 'template_uhw44ms';
        const userId = '6YJ6nE8MVaAiQDs06';

        const templateParams = {
            to_email: email,
            to_name: name,
            message: `Your qdel delivery partner account has been approved by the admin.`
        };

        emailjs.send(serviceId, templateId, templateParams, userId)
            .then((response) => {
                console.log('Email sent:', response);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };

    const handleClick = (id, email, name) => {
        axios.put(`http://localhost:3001/api/updateDeliveryRole/${id}`)
            .then((response) => {
                sendEmail(email, name);
                window.location.reload();
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleReject = (id) => {
        axios.put(`http://localhost:3001/api/rejectDeliveryRole/${id}`)
            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(error => {
                console.log(error, "error");
            });
    };

    const submitId = (id) =>{
        console.log(id);
        navigate(`/delivery/deliverydetails/${id}`);

    };

    return (
        <MDBTable align='middle'>
            <MDBTableHead>
                <tr>
                    <th scope='col'>No</th>
                    <th scope='col'>UserImg</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Phone Number</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>User Info</th>
                    <th scope='col'>Action</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            {item.user_image && (
                                <img width={'100px'} src={`http://localhost:3001/${item.user_image}`} alt={item.name} />
                            )}
                        </td>
                        <td>{item.name}</td>
                        <td>{item.phone_number}</td>
                        <td>{item.address}</td>
                        <td>
                            <button type="button" onClick={() =>submitId(item._id)} className="btn btn-primary btn-rounded">View</button>
                        </td>
                        <td>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Dropdown Button
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" onClick={() => handleClick(item._id, item.email, item.name)}>Approve</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2" onClick={() => handleReject(item._id)}>Reject</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                ))}
            </MDBTableBody>
        </MDBTable>
    );
}
