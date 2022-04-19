import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserContext";
import {ExitToApp}from '@material-ui/icons';
import App from '../../App'
import { Grid } from "@material-ui/core";
import animationData from '../../assets/98877-search.json'
import Lottie from 'react-lottie'
import logo from '../../assets/news.png'
const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
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
    <div style={{ width: "100%", }}>
      <div className="p-2 mt-3 text-center" style={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center' }}>
        <p className="emailID"><span className="text-normal">Welcome, </span>{user && user.email}</p>
        <p className="title" style={{marginLeft:"-80px"}}>Newzy<img src={logo} style={{height:'30px',width:'30px'}}/></p>
        <Button variant="success" onClick={handleLogout}>
          LOG OUT <ExitToApp style={{marginBottom:4}}/>
        </Button>
      </div>
      <div className="d-grid gap-2">

      </div>
      <App />
    </div>
  );
};

export default Home;