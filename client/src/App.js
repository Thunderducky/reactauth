import React, { useEffect, useState } from 'react';
import API from "./utils/API";
import logo from './logo.svg';
import axios from "axios";
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [privateInfo, setPrivateInfo] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignupSubmit(event){
    event.preventDefault();
    API.signup(email, password).then(response => console.log(response.data))
  }

  function handleSigninSubmit(event){
    event.preventDefault();
    API.signin(email, password).then(response => {
      setIsLoggedIn(true);
      axios.get("/api/secret/number").then(response => {
        setPrivateInfo({ secret: response.data})
      })
    })
  }
  function handleSignoutSubmit(event){
    event.preventDefault();
    API.signout().then(response => {
      setIsLoggedIn(false);
    })
  }

  function renderPrivateSection(){
    if(isLoggedIn){
      return <div>
        <h1>{privateInfo.secret}</h1>
      </div>
    }
  }

  return (
    <div className="App">
      <h1>Signup</h1>
      <div>
        <label htmlFor="email">Email: </label>
        <input name="email" type="text" value={email} onChange={(event) => { setEmail(event.target.value)}}/><br/>
        <label htmlFor="email">Password: </label>
        <input name="password" type="password" value={password} onChange={(event) => { setPassword(event.target.value)}}/> <br/>
        <button onClick={handleSignupSubmit}>Sign Up!</button>
        <button onClick={handleSigninSubmit}>Sign In!</button>
        <button onClick={handleSignoutSubmit}>Sign Out!</button>
      </div>
      {
        renderPrivateSection()
      }      
    </div>
  );
}

export default App;
