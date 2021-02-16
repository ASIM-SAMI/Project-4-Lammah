import API_URL from '../apiConfig.js'
import axios from "axios";
import { Link, useHistory } from 'react-router-dom'
import { Button, Form, Container, Row, Modal, Col, Alert } from "react-bootstrap";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
    email: Yup.string().required(" Enter your email ").email("example@example.com"),
    password: Yup.string().required(" Enter password "),
})

export const NavBar = (props) => {
    // Login functional
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    //for show alert 
    const [login, setLogin] = useState(true);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeInput = (event) => {
        const { name, value } = event.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    //login function
    const onSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`${API_URL}/api/user/login`, credentials)
            .then((res) => {

                const token = res.data.token;
                const msg = res.data.msg;

                if (token) {
                    localStorage.setItem("jwtToken", token);
                    props.loginCallback();
                    setShow(false)
                } else {
                    setLogin(false);
                    setTimeout(() => {
                        setLogin(true);
                    }, 5000);

                }
            });
    };
    //=================
    return (
        <>
            <div className="NavBar">
                <div className="frist-row">
                    {/* Brand Logo */}
                    <Link to="/" className="logo menu-element">
                    
                        </Link>

                    <input className="menu-element"
                    style={{height: '20px'}}/>

                    <div className="menu-element" >ENG</div>
                    <div className="menu-element">ACCOUNT</div>
                    <div className="menu-element">MY REQUESTS</div>
                </div>
                <div className="sec-row">


                    {/* The Menu */}


                    <Link to="/facilities" className="menu-element">FACILITIES</Link>

                    {props.auth.isLoggedIn ?
                        <Link to="/manage-brand" className="menu-element">BRAND</Link>
                        :
                        <></>}
                    {props.auth.isLoggedIn ?
                        <Link to="/my-page" className="menu-element">MY PAGE</Link>
                        :
                        <></>}
                    {props.auth.isLoggedIn ?
                        <Link to="/new-facility" className="menu-element">NEW FACILITY</Link>

                        :
                        <></>}
                    {props.auth.isLoggedIn ?
                        <></>
                        :
                        <Link
                            className="menu-element"
                            onClick={() => {
                                handleShow()
                                props.loginCallback()
                            }}>
                            LOGIN
                </Link>}
                    {console.log(props.auth)}

                    {props.auth.isLoggedIn ?
                        <Link
                            className="menu-element"
                            onClick={() => {

                                localStorage.removeItem("jwtToken");
                                props.loginCallback()
                                history.push(`/`)
                                    ;
                            }}>
                            LOGOUT
                </Link>
                        : <></>}



                    {/* Login pop-up model */}
                    <>


                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            {!login && (
                                <Alert variant={"danger"}>
                                    Your email or password is wrong
                                </Alert>
                            )}
                            <Modal.Header closeButton>
                                <Modal.Title>Login</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Formik
                                    validationSchema={validationSchema}
                                >
                                    <Container>
                                        <FormikForm>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label style={{ color: "black", fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                                    Email
                                     </Form.Label>

                                                <Form.Control as={Field} name="email" onChange={(e) => onChangeInput(e)} placeholder="email@example.com" />
                                                <ErrorMessage name="email" render={(msg) => <Alert variant={"danger"}>
                                                    {msg}
                                                </Alert>} />
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                                <Form.Label style={{ color: "black", fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                                    Password
                                    </Form.Label>

                                                <Form.Control as={Field} name="password" onChange={(e) => onChangeInput(e)} type="password" placeholder="Password" />
                                                <ErrorMessage name="password" render={(msg) => <Alert variant={"danger"}>
                                                    {msg}
                                                </Alert>} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Col md={12}>
                                                    <p style={{ color: "black", fontFamily: "serif" }}> You don't have an account? Please <Link eventKey={2} as={Link} to="/signup">
                                                        Register
                                       </Link>
                                                    </p>

                                                    <Button style={{ marginLeft: "150px" }} onClick={(e) => onSubmit(e)} variant="secondary">Login</Button>
                                                </Col>
                                            </Form.Group>

                                        </FormikForm>
                                    </Container>
                                </Formik>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                        </Button>

                            </Modal.Footer>
                        </Modal>
                    </>
                    {/* ==================== */}

                </div>
            </div>
        </>
    )
}