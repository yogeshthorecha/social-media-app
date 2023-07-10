import { NavLink} from "react-router-dom";
import "../css/LoginPage.css";
import dog_header_img from "../images/dog-img.jpg";
import dog_main_img from "../images/iphone6.png";
import {toast} from "react-hot-toast"
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
const LoginPage = () => {
  const {loginHandler} = useAuth()

  const [loginCredentials,setLoginCredentials] = useState({
    username:"",
    password:""
  })
const handleLogin = () => {
  if (
    loginCredentials.username.trim() === '' ||
    loginCredentials.password.trim() === '' 
  ) {
    toast.error("All fields are mandatory",{
      position:"Bottom-left"
      ,
      style:{
         fontSize:"20px",
         backgroundColor:"white",
         marginBottom:"20px"
      }}
      )
  }
  else {
    loginHandler(loginCredentials.username,loginCredentials.password)
  }
}

    
  return (
    <div className="login-page">
    <div className="login-section-1">
         <img src={dog_main_img} alt="mobile-dog"/>
    </div>
    <div className="login-section-2">
      <div className="login-header">
          <img src={dog_header_img} alt="dog_header" />
          <div>
          <h1>tindog</h1>
          <p>Paw Paw🐾</p>
          </div>
      </div>
      <div className="login-form">
        <div className="form">
            <h1>Login</h1>
            <label>Username</label>
            <input placeholder="dogesh@12" value={loginCredentials.username} onChange={(e)=>setLoginCredentials({...loginCredentials,username:e.target.value})}/>
            <label>Password</label>
            <input type="password" placeholder="*******" value={loginCredentials.password} onChange={(e)=>setLoginCredentials({...loginCredentials,password:e.target.value})}/>
            <button onClick={()=>handleLogin()}>Login</button>
            <div className = "login-footer">
            <NavLink onClick={()=>loginHandler("dogesh12","123")}>login as guest</NavLink>
            <label>Dont have an account? <NavLink to="/signup">Register now!</NavLink> </label>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};
export default LoginPage;
