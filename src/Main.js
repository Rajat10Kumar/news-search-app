import React  from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route ,useRoutes} from "react-router-dom";
import "./Main.css";
import Home from "./components/Authentication/Home";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserContext";
// const NavigationController=()=>{
//   let routes = useRoutes([
//     {path:"/",element:<Login/>},
//     {path:"/home",element:<ProtectedRoute><Home/></ProtectedRoute>},
//     {path:"/signup",element:<Signup/>}
//   ])
//   return routes;
// };
function Main() {
  return (
    // <Container style={{ width: "400px" }}>
    //   <Row>
    //     <Col>
    //       <UserAuthContextProvider>
    //         <Router>
    //           <NavigationController/>
    //         </Router>
    //       </UserAuthContextProvider>
    //     </Col>
    //   </Row>
    // </Container>
    <Container style={{ width: "400px" }}>
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
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default Main;