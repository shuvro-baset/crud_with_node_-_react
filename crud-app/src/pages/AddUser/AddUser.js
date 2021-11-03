
import React, { useRef } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

const AddUser = () => {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();


    const handleUserData = (e) => {
        e.preventDefault();
        const fName = firstNameRef.current.value;
        const lName = lastNameRef.current.value;
        const address = addressRef.current.value;
        const email = emailRef.current.value;

        const newUser = { fname: fName, lname: lName, address: address, email: email };
        fetch('http://localhost:5000/add-users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })

        // ------
        .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Successfully added the user.')
                    e.target.reset();
                }
            })
        e.preventDefault();
        console.log(newUser)
    }
    return (
        <Container className="my-5">
                <h2 className="text-center">Add Your New User Info.</h2>

            <Row className='d-flex justify-content-center align-items-center my-5'>
                <Col md={6}>
                    <Form onSubmit={handleUserData}>
                        <Form.Group className="mb-3" >
                            <Form.Control type="text" placeholder="First Name" ref={firstNameRef} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="text" placeholder="Last Name" ref={lastNameRef} required />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control type="email" placeholder="Email" ref={emailRef} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="text" placeholder="Address" ref={addressRef} required />
                        </Form.Group>
                        
                        <button className="btn btn-primary" type="submit">
                            Submit
                        </button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddUser;