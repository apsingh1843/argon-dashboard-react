/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner
} from "reactstrap";
import { withRouter } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase-config";
import axios from "axios";

const Register = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotify] = useState(false)
  //const [userData, setUserData] = useState({});

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUserData(currentUser);
  // });

  const apiCall = async (data) =>{
    console.log(data.uid, data.email);
    const postData = {
      uid : data.uid,
      email : data.email
    }
    var config = {
      method: 'post',
      url: 'https://registertest.free.beeceptor.com/init',
      headers: { 
        'Content-Type': 'text/plain'
      },
      data : JSON.stringify(postData)
    };
    
    axios(config)
    .then(response => {
      console.log(JSON.stringify(response.data));
      props.history.push('/auth/success');
    })
    .catch(function (error) {
      console.log(error);
      props.history.push('/auth/fail');
    });
    setIsLoading(false);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotify(false);
    console.log(name, email, password);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      //console.log(user);
      updateProfile(auth.currentUser, {
        displayName: name
      }).then(() => {
        apiCall(auth.currentUser);
      }).catch((error) => {
        console.log(error);
      });
    }
    catch (err) {
      console.log(err.message);      
      setIsLoading(false);
      setNotify(true);
    }
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div>
            {notify ? 
            <div className="text-center text-danger mb-4">
              <b>Could not Register. Please try again!</b>
            </div> : null }
            <Form role="form" onSubmit={handleRegister}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input required
                    placeholder="Name" 
                    type="text"
                    value={name} 
                    onChange={(e)=>setName(e.target.value)} 
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input required
                    placeholder="Email"
                    type="email"
                    value={email}
                    autoComplete="new-email"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input required
                    placeholder="Password"
                    type="password"
                    value={password}
                    autoComplete="new-password"
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input required
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                {isLoading ? <Spinner /> :
                  <Button className="mt-4" color="primary" type="submit">
                    Create account
                  </Button>
                }
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default withRouter(Register);
