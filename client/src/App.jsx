import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/auth/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Friends from "./pages/Friends";
import FriendsRequest from "./pages/FriendsRequest";
import { UserProvider } from "./context/users/UserContext";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <div className="d-flex min-vh-100 flex-column ">
          <Router>
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/:id/friends" element={<Friends />} />
              <Route path="/:id/friends/request" element={<FriendsRequest />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </Router>
        </div>
        <ToastContainer />
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
