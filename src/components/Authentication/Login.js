import React, { useState, useEffect,useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert ,Row,Container} from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../context/UserContext";
import {Grid} from '@material-ui/core'
import {AccountCircleOutlined,ExitToAppOutlined}from '@material-ui/icons';
import Lottie from 'react-lottie'
import animationData from '../../assets/69292-news.json'
import logo from '../../assets/news.png'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

  return (
    <Grid container
    direction="row"
    justifyContent="center"
    alignItems="center"
    spacing={2}>
    <Grid item style={{marginTop:50}}>
    <> <Lottie options={defaultOptions}
                        height={600}
                        width={850}
                /></>
  </Grid>
  <Grid item >
    <><Container>
      <div className="p-lg-5 box">
      <p className="title bold" style={{marginLeft:"60px",marginBottom:"60px"}}><img src={logo} style={{height:'30px',width:'30px'}}/>  Newzy</p>
        <h4 className="mb-3 text-center">Login <AccountCircleOutlined color="primary" fontSize="medium" style={{marginBottom:6}}/></h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              <h6>LOG IN <ExitToAppOutlined fontSize="small" style={{marginLeft:20}}/></h6> 
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
      </Container></>
  </Grid>
  
      
    </Grid>
  );
};

export default Login;