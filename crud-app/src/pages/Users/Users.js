import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';

const Users = () => {

    const [users, setUsers] = useState([]); 

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);


    return (
        <Container>
            <Row>
                <h2>all users... {!users && <span>0</span> } 
                {users && <span>{users.length}</span> }
                </h2>
            </Row>
        </Container>
    );
};

export default Users;