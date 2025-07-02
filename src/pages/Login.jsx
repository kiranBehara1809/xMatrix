import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const styles = {
    container: {
      height: "100vh",
      width: "100vw",
      margin: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      background: "#ffffff",
      padding: "40px",
      borderRadius: "20px",
      boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff",
      width: "300px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    heading: {
      marginBottom: "5px",
      color: "#333",
      fontSize: "24px",
      fontWeight: "600",
      margin: "0px !important",
    },
    subHeading: {
      marginBottom: "25px",
      color: "#333",
      fontSize: "20px",
      fontWeight: "600",
    },
    input: {
      width: "90%",
      padding: "12px 15px",
      marginBottom: "20px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      background: "#f0f0f3",
      fontSize: "14px",
      color: "#333",
      outline: "none",
      boxShadow: "inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff",
    },
    button: {
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "none",
      background: "#1976d2",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      boxShadow: "0 4px 15px rgba(108, 99, 255, 0.3)",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      background: "#574bff",
    },
    signup: {
      marginTop: "15px",
      fontSize: "14px",
      color: "#555",
    },
    link: {
      color: "#6c63ff",
      textDecoration: "none",
      marginLeft: "5px",
    },
  };

  const notify = () => toast("Sign Up functionality is not implemented yet!");
  const loginToast = () => toast("Welcome Back!");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.removeItem("userName");
  }, []);

  const loginHandler = () => {
    if (userName?.length !== 0 && password?.length !== 0) {
      if (
        userName.toLocaleLowerCase() === "editor" ||
        userName.toLocaleLowerCase() === "reader" ||
        userName.toLocaleLowerCase() === "admin"
      ) {
        navigate("/home");
        localStorage.setItem("userName", userName.toLocaleLowerCase());
      } else {
        toast.error("Please enter valid username!");
      }
    } else {
      toast.error("Please enter both username and password!");
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <div style={styles.card}>
        <h2 style={{ ...styles.heading, margin: 0 }}>X-Matrix</h2>
        <h2 style={styles.subHeading}>Login to Your Account</h2>
        <form style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Username"
            style={styles.input}
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            style={styles.button}
            onClick={() => {
              loginHandler();
            }}
          >
            Login
          </button>
        </form>
        <p style={styles.signup}>
          Don't have an account?
          <a
            style={styles.link}
            onClick={(e) => {
              e.preventDefault();
              notify();
            }}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
