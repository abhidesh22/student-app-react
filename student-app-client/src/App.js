import React, { useState, useEffect } from 'react';
import { Alert } from "react-bootstrap";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Home from './homePage/Home';
import AboutPage from './homePage/AboutPage';
import StudentList from './students/StudentList';
import StudentInfo from './students/StudentInfo';
import StudentCreate from './students/StudentCreate';
import NotFoundPage from './homePage/NotFoundPage';
import NavBar from './NavBar';
import './App.css';
import StudentEdit from './students/StudentEdit';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

function App( ) {

    const [user, setUser] = useState("");
    const [error, setError] = useState("");

    // @desc    Get the current logged in user from the local storage
    useEffect(() => {
      const loggedUser = localStorage.getItem('loggedUser');
      if (loggedUser) {
        setUser(JSON.parse(loggedUser).username)
      }
    },[]);

    // @desc    login hook - checks if its a registration request to avoid showing the login form for new registration
    //          also, sets the loggedin user details in the local storage

    return (
      <div className="App">
          <Router>        
            <NavBar user={user}/>
            <div id="page-body">
              <Routes>
                <Route path="/" element={ <Home /> } exact />
                <Route path="/about" element={ <AboutPage /> } />
                <Route path="/studentlist" element={ <StudentList /> }  />
                <Route path="/createstudent" element={ <StudentCreate />} />;
                <Route path="/editstudent/:id" element={ <StudentEdit />} />;
                <Route path="/home" element={ <Home /> } />
                <Route path="/student/:id" 
                        element = {<StudentInfo />}
                />
                <Route path="*" element = {<NotFoundPage /> } />
              </Routes>
            </div>
          </Router>
      </div>
    );
  }

export default App;
