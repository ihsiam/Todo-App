import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // login
  const login = async (user, nav) => {
    try {
      fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => {
          // login error handle
          if (!res.ok) {
            throw new Error("Incorrect email or password");
          }
          return res.json();
        })
        .then((res) => {
          // token set to browser local storage
          localStorage.setItem("token", res);
          // navigate to admin dashboard
          nav();
        })
        .catch((error) => {
          // Display the error message
          alert(error.message);
        });
    } catch {
      alert("Login error");
    }
  };

  const googleLogin = () => {
    window.open("http://localhost:3000/auth/google", "_self");
    localStorage.setItem("googleAuth", true);
  };

  // user data and validation handle
  const isAuthorizedUser = () => {
    const token = localStorage.getItem("token");
    const googleAuth = localStorage.getItem("googleAuth");

    if (token) {
      try {
        const user = jwtDecode(token);
        // Check if token is expired
        if (user.exp > Date.now() / 1000) {
          return true;
        } else {
          // Token expired, clear localStorage
          localStorage.removeItem("token");
          return false;
        }
      } catch (error) {
        // Handle decoding errors
        console.error("Error decoding token:", error);
        return false;
      }
    } else if (googleAuth) {
      // For Google authentication, return true if `googleAuth` is set
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthorizedUser, login, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node,
};
