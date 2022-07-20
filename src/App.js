import Navbar from "./Components/Navbar";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Notfound from "./Components/NotFound";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Reset from "./Components/Reset";
import RessetPassword from "./Components/RessetPassword";

function App() {
  const [user, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    }
  }, []);

  function getUserData() {
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    setUserData(decodedToken);
  }
  function logout() {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/login");
  }
  useEffect(() => {}, [user]);
  function ProtectedRoute({ children }) {
    if (!localStorage.getItem("token")) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  }
  return (
    <>
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="universities"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="login" element={<Login getUserData={getUserData} />} />
        <Route path="register" element={<Register />} />
        <Route path="reset" element={<Reset />} />
        <Route path="reset-password" element={<RessetPassword />}>
          <Route path=":token" element={<RessetPassword />} />
        </Route>

        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
