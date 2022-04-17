import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import Main from './Main';

ReactDOM.render(
    <Router>
        <Main />
    </Router>, 
    document.getElementById('root')
    );
