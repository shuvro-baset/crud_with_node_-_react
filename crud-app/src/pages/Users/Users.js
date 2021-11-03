import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Users.css'
const Users = () => {

    const [users, setUsers] = useState([]); 
    const [page, setPage] = useState(0); // page number state
    const [pageCount, setPageCount] = useState(0); // pageCount state
    const size = 3
    useEffect(() => {
        fetch(`http://localhost:5000/users?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setUsers(data.users)
                const count = data.count;
                const pageNumber = Math.ceil(count/size);
                setPageCount(pageNumber);
                
            });
    }, [page]);

    // DELETE AN USER
    const handleDeleteUser = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            const url = `http://localhost:5000/users/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const remainingUsers = users.filter(user => user._id !== id);
                        setUsers(remainingUsers);
                    }
                });
        }
    }
    return (
        <Container>
                <h2 className="text-center my-3"> Number of Users ....  {!users && <span>0</span> } 
                    {users && <span>{users.length}</span> }
                </h2>
            <Row>
                
                {
                    users.map(user => 
                        <Col md={4}
                        key={user._id}
                        className="my-3">
                            <div className="shadow p-3">
                                <div>
                                    <h5>First Name: {user.fname} </h5>
                                    <h5>Last Name: {user.lname} </h5>
                                    <h5>Email: {user.email} </h5>
                                    <h5>Address: {user.address} </h5>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to={`/update-user/${user._id}`}><button className="btn btn-info">update</button></Link>


                                    
                                    <button onClick={() => handleDeleteUser(user._id)} className="btn btn-danger" >delete</button>
                                </div>
                            </div>
                        </Col>
                    )
                }
            </Row>
            <Row className="py-3">
            <div className="pagination d-flex justify-content-center align-items-center">
                        {
                            [...Array(pageCount).keys()]
                                .map(number => <button
                                    className={number === page ? 'selected' : ''}
                                    key={number}
                                    onClick={() => setPage(number)}
                                >{number + 1}</button>)
                        }
                    </div>
            </Row>
        </Container>
    );
};

export default Users;