import React  from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route ,useRoutes} from "react-router-dom";
import "./Main.css";
import Home from "./components/Authentication/Home";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import OpenArticle from './components/History/Open'
import { UserAuthContextProvider } from "./context/UserContext";
import {AppBar,Typography,Toolbar,Button} from '@material-ui/core'
function Main() {
  return (
    // <Container style={{ width: "100vw" }}>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/openarticles" element={<OpenArticle />} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
  //  </Container>
  );
}

export default Main;