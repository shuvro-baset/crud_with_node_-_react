import React from 'react';
import { Container, Row } from 'react-bootstrap';
import {useState, useEffect} from 'react'
import { useParams } from 'react-router';

const UpdateUser = () => {
    const [user, setUser] = useState({});
    const {userId} = useParams()

    // getting specific user information 
    useEffect(()=> {
        const uri = `http://localhost:5000/update-user/${userId}`;
        fetch(uri)
        .then(res => res.json())
        .then(data => setUser(data));
}, []);



     // Update User
    const handleFnameChange = e => {
        const updatedFname = e.target.value;
        const updatedUser = { fname: updatedFname, lname: user.lname, email: user.email, address: user.address};
        setUser(updatedUser);
    }
    const handleLnameChange = e => {
        const updatedLname = e.target.value;
        const updatedUser = { fname: user.fname, lname: updatedLname, email: user.email, address: user.address};
        setUser(updatedUser);
    }
    const handleAddressChange = e => {
        const updatedAddress = e.target.value;
        const updatedUser = { fname: user.fname, lname: user.lname, email: user.email, address: updatedAddress};
        setUser(updatedUser);
    }

    const handleEmailChange = e => {
        const updatedEmail = e.target.value;
        const updatedUser = { fname: user.fname, lname: user.lname, email: updatedEmail, address: user.address};
        setUser(updatedUser);
    }
    const handleUpdateUserInfo = (e) => {
        const url = `http://localhost:5000/update-user/${userId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Update Successful');
                    setUser({});
                    e.target.reset();
                }
            })
        e.preventDefault();
    }
    return (
        <Container>
            <Row>
                <h2>update user info</h2>

                <h2>Update: {user.name}</h2>
                <p><small>{userId}</small></p>
                <form onSubmit={handleUpdateUserInfo}>
                    <input type="text" onChange={handleFnameChange}  value={user.fname || ''} /> <br />
                    <input type="text"  onChange={handleLnameChange} value={user.lname || ''} /> <br />
                    <input type="email" onChange={handleAddressChange}  value={user.email || ''} /> <br />
                    <input type="text" onChange={handleEmailChange}  value={user.address || ''} /> <br />
                    <input type="submit" value="Update" />
                </form>
            </Row>
        </Container>
    );
};

export default UpdateUser;