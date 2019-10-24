import React, {useState, createContext} from 'react';
import logo from './logo.svg';
import './App.scss';

import { LogsContext } from './contexts/LogsContext';
import { LoginContext } from './contexts/LoginContext';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from "./utils/PrivateRoute";

import axios from 'axios';
import HomePage from "./components/HomePage";
import SignupForm from "./components/SignupForm";
import LakesMap from "./components/LakesMap";
import UserProfile from "./components/UserProfile";
import AddLog from "./components/AddLog";
import NavBar from "./components/NavBar";
import Copyright from "./components/Copyright";
import LoginForm from "./components/LoginForm";
import Location from "./components/Location";
import LocationCard from "./components/LocationCard"; 

function App() {
  

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);
  const [logs, setLogs] = useState([]);

  return (
    <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <LogsContext.Provider value={{logs, setLogs}}>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' render={props => <HomePage {...props} />} />
          
          <Route path='/login' component={LoginForm} />
          <Route path='/signup' render={props => <SignupForm {...props} />} />
          {//Map should be a private route
          }
          <Route path='/map' render={props => <LakesMap {...props} />} />
          {//UserProfile should be private route
          }
          <PrivateRoute path='/profile' component={UserProfile} />
          {//AddLog should be private route
          }
          <PrivateRoute path='/addlog' component={AddLog} />

          <Route exact path='/location' component={Location} />

          <Route path="/location/:name" render={props => <LocationCard {...props}/>}/>
          
        </Switch>
        <Copyright />
      </div>
      </LogsContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
