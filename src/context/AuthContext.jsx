import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const navigate = useNavigate();
  const loginHandler = async (username, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (res.status === 200 || res.status === 201) {
        const { foundUser, encodedToken } = await res.json();
        localStorage.setItem("encodedToken", encodedToken);
        setActiveUser(foundUser);
        setToken(encodedToken);
        toast.success(`Welcome back ${foundUser.firstName}`, {
          position: "Bottom-left",
          style: {
            fontSize: "20px",
            backgroundColor: "white",
            marginBottom: "20px",
          },
        });
        navigate("/");
      } else {
        toast.error("wrong credentials", {
          position: "Bottom-left",
          style: {
            fontSize: "20px",
            backgroundColor: "white",
            marginBottom: "20px",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const signupHandler = async (firstName, lastName, username, password) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
        }),
      });
      console.log(res)
      if (res.status === 200 || res.status === 201) {
        const { encodedToken, createdUser } = await res.json();
        localStorage.setItem("encodedToken", encodedToken);
        setToken(encodedToken);
        setActiveUser(createdUser);
        toast.success(`Welcome ${createdUser.firstName}`, {
          position: "Bottom-left",
          style: {
            fontSize: "20px",
            backgroundColor: "white",
            marginBottom: "20px",
          },
        });
        navigate("/");
      } else {
        toast.error("Username already exist", {
          position: "Bottom-right",
          style: {
            fontSize: "20px",
            backgroundColor: "white",
            marginBottom: "20px",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ token, loginHandler, signupHandler, activeUser,setToken,setActiveUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
