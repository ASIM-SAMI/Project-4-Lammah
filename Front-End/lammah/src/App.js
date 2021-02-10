import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react';
import SignUp from './pages/SignUp'
import NewFacility from './pages/NewFacility'
import Login from './pages/Login'
import jwt_decode from "jwt-decode";

//Pages
import Facilities from './pages/Facilities';

//Styles
import './style/facilities.css';
import OneFacility from "./pages/OneFacility";

function App() {
  const [selectFacility, setSelectFacility] = useState({})
  const [dataLoading, setDataloading] = useState(false)
  const [auth, setAuth] = useState({ currentUser: null, isLoggedIn: false });

  const userLogin = () => {
    if (localStorage.jwtToken) {
      const jwtToken = localStorage.jwtToken;
      const currentUser = jwt_decode(jwtToken, "SECRET").user;
      setAuth({ currentUser, isLoggedIn: true });
    } else {
      setAuth({ currentUser: null, isLoggedIn: false });
    }

    setDataloading(true)
  };
  console.log("The current User is: ", auth.currentUser, "data loading", dataLoading);

  useEffect(userLogin, []);
  return (
    <div className="App">
      <Router>

        <Route path="/signup">
          <SignUp />
        </Route>

        <Route path="/new-facility">
          <NewFacility setAuth={setAuth} auth={auth}/>
        </Route>

        <Route loginCallback={userLogin} auth={auth} path="/login">
          <Login />
        </Route>

        <Route path='/facilities'>
          <Facilities setSelectFacility={setSelectFacility} />
        </Route>

        <Route path='/facilities/:id'>
          <OneFacility selectFacility={selectFacility} />
        </Route>

      </Router>
    </div>
  );
}

export default App;
