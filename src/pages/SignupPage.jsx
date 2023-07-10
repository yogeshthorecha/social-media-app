import { NavLink } from "react-router-dom";
import "../css/SignupPage.css";
import dog_header_img from "../images/dog-img.jpg";
import { toast } from "react-hot-toast";
import dog_main_img from "../images/iphone6.png";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
const SignupPage = () => {
  const {signupHandler} = useAuth()
  const [signupCredentials, setSignupCredentials] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const handleSignup = () => {
    if (
      signupCredentials.firstName.trim() === '' ||
      signupCredentials.lastName.trim() === '' ||
      signupCredentials.username.trim() === '' ||
      signupCredentials.password.trim() === '' 
    ) {
      toast.error("All fields are mandatory",{
        position:"Bottom-right"
        ,
        style:{
           fontSize:"20px",
           backgroundColor:"white",
           marginBottom:"20px"
        }}
        )
    }
    else {
      signupHandler(signupCredentials.firstName,signupCredentials.lastName,signupCredentials.username,signupCredentials.password)
    }
  }
  return (
    <div className="signup-page">
      <div className="signup-section-2">
        <div className="signup-header">
          <img src={dog_header_img} alt="dog-header" />
          <div>
            <h1>tindog</h1>
            <p>Paw Paw🐾</p>
          </div>
        </div>
        <div className="signup-form">
          <div className="form">
            <h1>Sign Up</h1>
            <div className="full-name">
              <div className="input-group">
                <label>First Name</label>
                <input
                  placeholder="First Name"
                  value={signupCredentials.firstName}
                  onChange={(e) =>{
                    setSignupCredentials({
                      ...signupCredentials,
                      firstName:e.target.value,
                    })}
                  }
                />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input
                  placeholder="Last Name"
                  value={signupCredentials.lastName}
                  onChange={(e) =>{
                    setSignupCredentials({
                      ...signupCredentials,
                      lastName:e.target.value,
                    })}
                  }
                />
              </div>
            </div>
            <label>Username</label>
            <input
              placeholder="dogesh@12"
              value={signupCredentials.username}
              onChange={(e) =>{
                setSignupCredentials({
                  ...signupCredentials,
                  username:e.target.value,
                })}
              }
            />
            <label>Password</label>
            <input
              placeholder="*******"
              value={signupCredentials.password}
              onChange={(e) =>{
                setSignupCredentials({
                  ...signupCredentials,
                  password:e.target.value,
                })
              }
              }
            />
            <button onClick={()=>handleSignup()}>Sign Up</button>
            <div className="signup-footer">
              <label>
                Already have an account?{" "}
                <NavLink to="/login">Login now!</NavLink>{" "}
              </label>
            </div>
            </div>
        </div>
      </div>
      <div className="signup-section-1">
        <img src={dog_main_img} alt="mobile-dog" />
      </div>
    </div>
  );
};
export default SignupPage;
