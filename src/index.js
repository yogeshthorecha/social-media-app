import React from "react";
import ReactDOM from "react-dom/client";
import { makeServer } from "./server";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { PostContextProvider } from "./context/PostContext";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { UsersContextProvider } from "./context/UsersContext";

// Call make Server
makeServer();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <UsersContextProvider>
          <PostContextProvider>
            <App />
          </PostContextProvider>
        </UsersContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
