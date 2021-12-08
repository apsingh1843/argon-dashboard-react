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
import {
    Button,
    Card,
    CardBody,
    Col,
  } from "reactstrap";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
import { auth } from "../../firebase-config";
import { withRouter, Redirect } from "react-router-dom";
  
  const Success = (props) => {
    const [userData, setUserData] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
      setUserData(currentUser);
    });

    const logout = async () =>{
      await signOut(auth);
      props.history.push('/auth/login');
    }

    if(userData){
      return (
        <>
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <b>Congrats!<br/>Your online notary has been scheduled.</b>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={logout}>
                  Logout
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </>
      );
    }
    else{
      return <Redirect to='/auth/login' />;
    }
    
  };
  
  export default withRouter(Success);
  